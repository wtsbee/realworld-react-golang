package crypto

import "golang.org/x/crypto/bcrypt"

// 暗号(Hash)化
func PasswordEncrypt(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}
