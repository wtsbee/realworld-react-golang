package controllers

import (
	"net/http"
)

func StartMainServer() {
	http.HandleFunc("/hello", hello)

	http.ListenAndServe(":8080", nil)
}
