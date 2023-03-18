package models

import (
	"context"

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

const userKey contextKey = "user"

// ContextWithUser  ユーザー情報をコンテキストにセット
func ContextWithUser(parent context.Context, user *User) context.Context {
	return context.WithValue(parent, userKey, user)
}
