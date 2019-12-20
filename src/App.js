import React from 'react';
import './App.css';
import { PDFReader } from 'reactjs-pdf-reader';

// Bootstrap
import { Button , Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
  let [ fileBase64 , setFileBase64 ] = React.useState(null)
  let [ fileText , setFileText ] = React.useState(null)
  let [ page, setPage ] = React.useState(1)
  let [ currentPage, setCurrentPage ] = React.useState(1)
  let [ modalPdf , setModalPdf ] = React.useState(false)
  let [ items , setItems ] = React.useState([])
  let fileInput = React.createRef()

  let handleFileChange = (files) => {
    let reader = new FileReader()
    reader.onload = (_) => {
      setFileBase64(btoa(reader.result))
      let pdfText = window.pdf2text(btoa(reader.result))
      setFileText(pdfText)
      let matchItems = pdfText.matchAll(/(?<item>\d{1,2})\s(?<materialno>\d{10})\s(?<description>[0-9A-Z\-\s\&\.]+)\s(?<date>\d{1,2}\.\d{1,2}\.\d{4})\s(?<quantity>\d+|\d+.\d+)\s(?<quantifier>\w+)\s(?<unitprice>\d+\,?\d+\.\d{2})\s(?<totalprice>\d+\,?\d+\.\d{2})/gm)
      setItems(Array.from(matchItems).map(item => item.groups))
    }

    reader.readAsBinaryString(files[0])
  }

  const pdfWidth = window.innerWidth * 0.8
  console.log(pdfWidth)

  return (
    <div className="App">
      <div className="dropFileArea">
        <div style={{display:'flex', height: '40px', verticalAlign:'middle'}}>
          <div style={{padding:'8px'}}>Drop file or</div>

          <Button onClick={()=>{
              fileInput.current.click();
          }}>Select File</Button>

          <input type="file" ref={fileInput} onChange={(evt)=>{
            let files = evt.target.files 
            if(files.length > 0){
              handleFileChange(files)
            }
          }} style={{display:'none'}} accept=".pdf"/>
        </div>
        
      </div>
      
      {items.length > 0 && <table className="po-output">
        <thead>
          <tr>
            {Object.keys(items[0]).map((field, fieldid)=>{
              return <td key={fieldid}>{`${field}\t`}</td>
            })}
          </tr>
        </thead>  
        <tbody>
          {items.map((item, itemid)=>{
            return <tr key={`item_${itemid}`}>
              {Object.keys(item).map((field, fieldid)=>{
                return <td key={`item_${itemid}_${fieldid}`}>{`${item[field]}\t`}</td>
              })}
            </tr>
          })}
          <tr></tr>
        </tbody>
      </table>}
      {/*fileBase64 !== null && <PDFReader data={atob(fileBase64)} width={700}/>*/}
      {fileBase64 !== null && <Button variant="secondary" onClick={()=>{setModalPdf(true)}} >View PDF</Button>}
      
      {/* Unhide for debug purpose <div>{fileText}</div>*/}
      <Modal centered scrollable show={modalPdf} onHide={()=>{setModalPdf(false)}} dialogClassName={'pdf-modal'} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>PDF Document</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {fileBase64 !== null && <PDFReader data={atob(fileBase64)} size={0.7} onDocumentComplete={
            (page)=>{
              setPage(page)
            }
          } page={currentPage} width={pdfWidth}/>}
        </Modal.Body>

        <Modal.Footer>
          <div>Page {currentPage} of {page}</div>
          <Button variant="secondary" onClick={()=>{if(currentPage-1 >= 0) setCurrentPage(currentPage-1)}} disabled={currentPage == 1}>Previous</Button>
          <Button variant="secondary" onClick={()=>{if(currentPage+1 <= page) setCurrentPage(currentPage+1)}} disabled={currentPage == page}>Next</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
