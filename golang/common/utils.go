package common

import (
	"fmt"
	"mypackage/app/models"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Auth struct {
	Id    int
	Email string
	Exp   int
}

// M is a generic map
type M map[string]interface{}

func GenerateUserToken(user *models.User) string {
	jwt_token := jwt.New(jwt.GetSigningMethod("HS256"))
	// Set some claims
	jwt_token.Claims = jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}
	// Sign and get the complete encoded token as a string
	token, _ := jwt_token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	return token
}

func parseToken(tokenString string) (M, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return M(claims), nil
	} else {
		return nil, err
	}
}
