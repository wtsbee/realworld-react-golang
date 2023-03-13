package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model `json:"-"`
	Username   string `gorm:"unique_index;not null" json:"username"`
	Email      string `gorm:"unique_index;not null" json:"email"`
	Password   string `gorm:"not null" json:"password"`
	Bio        string `json:"bio"`
	Image      string `json:"image"`
}
