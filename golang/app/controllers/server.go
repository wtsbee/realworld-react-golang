package controllers

import (
	"net/http"
	"os"

	"github.com/rs/cors"
)

func StartMainServer() {
	mux := http.NewServeMux()
	mux.HandleFunc("/hello", hello)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("FRONTEND_URL")},
		AllowedMethods:   []string{http.MethodGet, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)
	http.ListenAndServe(":8080", handler)
}
