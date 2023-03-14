package models

import (
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
