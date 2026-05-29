package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
)

type FileInfo struct {
	Nome       string
	Dimensione string
	Modifica   string
	IsDir      bool
}

func main() {
	// Servire file statici come CSS e JS
	fs := http.FileServer(http.Dir("."))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.Handle("/styles.css", http.FileServer(http.Dir(".")))
	http.Handle("/script.js", http.FileServer(http.Dir(".")))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles("menu.html"))
		tmpl.Execute(w, nil)
	})

	//http.HandleFunc("/", menu)

	http.HandleFunc("/mostra", mostraFile)

	log.Println("Server in ascolto su http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}

}

func mostraFile(w http.ResponseWriter, req *http.Request) {
	entries, err := os.ReadDir(".")
	if err != nil {
		http.Error(w, "Impossibile leggere la directory", http.StatusInternalServerError)
		return
	}

	var files []FileInfo
	for _, e := range entries {
		if e.Name() == ".git" {
			continue
		}
		info, err := e.Info()
		if err != nil {
			continue
		}
		files = append(files, FileInfo{
			Nome:       e.Name(),
			Dimensione: formatSize(info.Size()),
			Modifica:   info.ModTime().Format("02/01/2006 15:04"),
			IsDir:      e.IsDir(),
		})
	}

	tmpl := template.Must(template.ParseFiles("files.html"))
	tmpl.Execute(w, files)
}

func formatSize(b int64) string {
	switch {
	case b >= 1<<20:
		return fmt.Sprintf("%.1f MB", float64(b)/(1<<20))
	case b >= 1<<10:
		return fmt.Sprintf("%.1f KB", float64(b)/(1<<10))
	default:
		return fmt.Sprintf("%d B", b)
	}
}
