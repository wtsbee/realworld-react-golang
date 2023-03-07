package controllers

import (
	"io"
	"log"
	"net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
	log.Println("hello")
	io.WriteString(w, "Hello-2\n")
}
