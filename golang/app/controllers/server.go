package controllers

import (
	"mypackage/database"
	"net/http"
	"os"

	"github.com/rs/cors"
)

func StartMainServer() {
	db := database.DbConnect()
	// db.Migrator().DropTable(&models.User{})
	database.Migrate(db)

	mux := http.NewServeMux()
	mux.HandleFunc("/hello", hello)
	mux.HandleFunc("/api/users", userRegistration)
	mux.HandleFunc("/api/users/login", login)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("FRONTEND_URL")},
		AllowedMethods:   []string{http.MethodGet, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)
	http.ListenAndServe(":8080", handler)
}
