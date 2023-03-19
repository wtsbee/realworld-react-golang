package models

import (
	"context"
	"errors"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model `json:"-"`
	Username   string `gorm:"unique;not null" json:"username"`
	Email      string `gorm:"unique;not null" json:"email"`
	Password   string `gorm:"not null" json:"password,omitempty"`
	Bio        string `json:"bio"`
	Image      string `json:"image"`
	Token      string `json:"token"`
}

type contextKey string

const (
	userKey  contextKey = "user"
	tokenKey contextKey = "token"
)

// ユーザー情報をコンテキストにセット
func SetContextUser(parent context.Context, user *User) context.Context {
	return context.WithValue(parent, userKey, user)
}

// ユーザー情報をコンテキストから取り出す
func GetUserFromContext(ctx context.Context) (*User, error) {
	v := ctx.Value(userKey)
	user, ok := v.(*User)
	if !ok {
		return nil, errors.New("user not found")
	}
	return user, nil
}

func SetContextUserToken(parent context.Context, token string) context.Context {
	return context.WithValue(parent, tokenKey, token)
}

func GetUserTokenFromContext(ctx context.Context) (string, error) {
	token, ok := ctx.Value(tokenKey).(string)
	if !ok {
		return "", errors.New("token not found")
	}
	return token, nil
}
