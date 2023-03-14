package common

import (
	"mypackage/app/models"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// var secretKey = os.Getenv("SECRET_KEY")

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
