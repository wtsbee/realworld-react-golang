package common

import (
	"log"
	"mypackage/app/models"
	"mypackage/database"
	"net/http"
	"regexp"
	"strings"
)

func Authenticate(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")

		if authHeader == "" {
			log.Println("トークンが存在しません。")
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("{\"message\": \"トークンが存在しません。\"}"))
			return
		}

		ss := strings.Split(authHeader, " ")

		if len(ss) < 2 {
			log.Println("トークンに値が存在しません。")
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("{\"message\": \"トークンに値が存在しません。\"}"))
			return
		}

		token := ss[1]

		re := regexp.MustCompile(`(^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$)`)
		ms := re.MatchString(token)

		if !ms {
			log.Println("トークンがJWT形式ではありません。")
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("{\"message\": \"トークンがJWT形式ではありません。\"}"))
			return
		}

		claims, err := parseToken(token)

		if err != nil {
			log.Println("トークンエラーが発生しました。", err)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("{\"message\": \"トークンエラーが発生しました。\"}"))
			return
		}

		email := claims["email"].(string)
		user := models.User{}
		db := database.DbConnect()
		if err := db.Where("email = ?", email).First(&user).Error; err != nil {
			log.Println(err)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("{\"message\": \"emailが一致するユーザーが見つかりませんでした。\"}"))
			return
		}

		ctx := r.Context()
		ctx = models.ContextWithUser(ctx, &user)

		next.ServeHTTP(w, r.WithContext(ctx))
	}
}
