package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	Title       string `gorm:"not null"`
	Description string
	Body        string
	Tags        []Tag `gorm:"many2many:article_tags;association_autocreate:false"`
}

func (article *Article) AddTags(tags ...string) {
	for _, t := range tags {
		article.Tags = append(article.Tags, Tag{Name: t})
	}
}
