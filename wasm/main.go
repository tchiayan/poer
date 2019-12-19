package main

import (
	"bytes"
	"encoding/base64"
	"strings"
	"syscall/js"

	"github.com/ledongthuc/pdf"
)

func readPdf2(this js.Value, i []js.Value) interface{} {
	/*fbyte, err := ioutil.ReadFile(path)

	if err != nil {
		panic(err)
	}*/
	//base64output := base64.StdEncoding.EncodeToString(fbyte)
	//println(base64output)

	base64output := i[0].String()
	decodedBytes, err := base64.StdEncoding.DecodeString(base64output)

	if err != nil {
		panic(err)
	}

	reader := bytes.NewReader(decodedBytes)
	r, err := pdf.NewReaderEncrypted(reader, int64(reader.Len()), nil)

	/*f, r, err := pdf.Open(path)
	defer func() {
		_ = f.Close()
	}()*/
	if err != nil {
		println(err)
	}

	totalPage := r.NumPage()

	var buf bytes.Buffer
	for pageIndex := 1; pageIndex <= totalPage; pageIndex++ {
		p := r.Page(pageIndex)
		//fmt.Println("================= Page", pageIndex, " =====================")
		if p.V.IsNull() {
			continue
		}

		rows, _ := p.GetTextByRow()
		for _, row := range rows {

			for _, word := range row.Content {
				if word.S != "" {
					buf.WriteString(strings.TrimSpace(word.S) + " ")
					//fmt.Println(">>>> row: ", strings.TrimSpace(word.S))
				}
			}
		}
	}
	return buf.String()
}

func registerCallback() {
	js.Global().Set("pdf2text", js.FuncOf(readPdf2))
}

func main() {
	c := make(chan struct{}, 0)
	registerCallback()
	<-c
}
