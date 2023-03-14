package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mypackage/app/models"
	"mypackage/common"
	"mypackage/crypto"
	"mypackage/database"
	"net/http"

	"github.com/go-playground/validator/v10"
)

// M is a generic map
type M map[string]interface{}

type Input struct {
	User struct {
		Email    string `json:"email" validate:"required,email"`
		Username string `json:"username" validate:"required,min=2"`
		Password string `json:"password" validate:"required,min=5,max=255"`
	} `json:"user" validate:"required"`
}

func hello(w http.ResponseWriter, r *http.Request) {
	log.Println("hello")
	io.WriteString(w, "Hello-2\n")
}

func userRegistration(w http.ResponseWriter, r *http.Request) {
	params := Input{}

	json.NewDecoder(r.Body).Decode(&params)
	// Unmarshalを使う場合
	// body, _ := io.ReadAll(r.Body)
	// json.Unmarshal([]byte(body), &params)

	validate := validator.New()
	if err := validate.Struct(params.User); err != nil {
		log.Println(err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("{\"message\": \"バリデーションエラーが発生しました。\"}"))
		return
	}

	encryptPw, err := crypto.PasswordEncrypt(params.User.Password)
	if err != nil {
		fmt.Println(err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"message\": \"パスワードの暗号化に失敗しました。\"}"))
		return
	}

	u := models.User{Email: params.User.Email, Username: params.User.Username, Password: encryptPw}
	db := database.DbConnect()
	result := db.Create(&u)
	if result.Error != nil {
		log.Println(result.Error)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"message\": \"データの登録に失敗しました。\"}"))
		return
	}

	token := common.GenerateUserToken(&u)

	user := models.User{
		Email:    params.User.Email,
		Username: params.User.Username,
		Token:    token,
	}

	resData := M{"user": user}
	jsonBytes, _ := json.Marshal(resData)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(jsonBytes)
	if err == nil {
		log.Println(err)
	}
}
