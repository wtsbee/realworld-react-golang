package controllers

import (
	"net/http"

	"github.com/rs/cors"
)

func StartMainServer() {
	mux := http.NewServeMux()
	mux.HandleFunc("/hello", hello)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)
	http.ListenAndServe(":8080", handler)
}
