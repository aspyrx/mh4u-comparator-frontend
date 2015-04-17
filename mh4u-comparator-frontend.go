package main

import (
    "bytes"
    "compress/gzip"
    "io"
	"log"
	"net/http"
    "os"
    "path/filepath"
    "strings"
)

type fileCache struct {
	buf bytes.Buffer
    gzipped bytes.Buffer
}

func (f *fileCache) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
        w.Header().Set("Content-Encoding", "gzip")
        w.Write(f.gzipped.Bytes())
    } else {
        w.Write(f.buf.Bytes())
    }
}

func NewCache(fileName string) *fileCache {
	f, err := os.Open(fileName)
    defer f.Close()
	if err != nil {
		log.Fatalf("couldn't open file: %v", err)
	}

	ret := &fileCache{}
    gzipper := gzip.NewWriter(&ret.gzipped)
    defer gzipper.Close()
	_, err = io.Copy(io.MultiWriter(&ret.buf, gzipper), f)
    if err != nil {
		log.Fatalf("couldn't read file: %v", err)
	}

	return ret
}

const staticFileDirectory = "dist"

var staticFiles = map[string]*fileCache {}

func main() {
    staticFilePaths := []string {}
    err := filepath.Walk(staticFileDirectory, func(path string, info os.FileInfo, err error) error {
        if !info.IsDir() {
            // deal with Windows path separator
            staticFilePaths = append(staticFilePaths, path)
        }
        return err
    })
    if err != nil {
        log.Fatal(err)
    }
    
    for _, path := range staticFilePaths {
        staticFiles[path] = NewCache(path)
    }

	http.HandleFunc("/", rootHandler)
	if err := http.ListenAndServe("0.0.0.0:80", nil); err != nil {
		log.Fatal(err)
	}
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
    var path string
    switch (r.URL.Path) {
        case "/":
            path = filepath.FromSlash(staticFileDirectory + "/index.xhtml")
        default:
            path = filepath.FromSlash(staticFileDirectory + r.URL.Path)
    }
    
    file, ok := staticFiles[path]
    if !ok {
        w.WriteHeader(http.StatusNotFound)
        return
    }
    
    var contentType string
    switch (filepath.Ext(path)) {
        case ".xhtml":
            contentType = "application/xhtml+xml"
        case ".css":
            contentType = "text/css"
        case ".js":
            contentType = "application/javascript"
        case ".svg":
            contentType = "image/svg+xml"
        default:
            contentType = "text/plain"
    }
    w.Header().Set("Content-Type", contentType)
    
    file.ServeHTTP(w, r)
}
