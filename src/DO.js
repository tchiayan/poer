import React from 'react'

import { PDFReader } from 'reactjs-pdf-reader';

// Bootstrap
import { Button , Modal, Table, ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// moment.js
import * as moment from 'moment';

// Exceljs
import Excel from 'exceljs';

function DO(){

    let [ fileBase64 , setFileBase64 ] = React.useState(null)
    let [ viewItem , setViewItem ] = React.useState([])
    let [ modalItem , setModalItem ] = React.useState(false)
    let [ page, setPage ] = React.useState(1)
    let [ currentPage, setCurrentPage ] = React.useState(1)
    let [ modalPdf , setModalPdf ] = React.useState(false)
    let [ items , setItems ] = React.useState([])
    let fileInput = React.createRef()

    let exportCSV = () => {
        let content = []
        let totalItems = items.flatMap(item => item.items)
        content = totalItems.map(lineItem => Object.values(lineItem))

        if(content.length > 0){
        let wb = new Excel.Workbook()
        let ws = wb.addWorksheet("PO")
        ws.addRow(Object.keys(totalItems[0]))

        ws.addRows(content)
        //content = [Object.keys(totalItems[0]).join(","), ...content]
        wb.xlsx.writeBuffer().then((buffer) => {
            let blob = new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
            let elem = window.document.createElement("a")
            elem.href = window.URL.createObjectURL(blob)
            elem.download = 'DO_Export.xlsx'
            elem.click()
        })
        }
    }

    let handleFileChange = async (files) => {
        let promise = Array.from(files).map((file)=>{
            return new Promise((resolve)=>{
                let reader = new FileReader()
                reader.onload = async (_) => {
                //setFileBase64(btoa(reader.result))

                    var loadingTask = window.pdfjsLib.getDocument({ data:  reader.result});
                    var pdfText = await loadingTask.promise.then(async (pdfDocument) => {
                        const numberOfPage = pdfDocument.numPages
                        let final = ""
                        for(let i = 1; i <= numberOfPage ; i++){
                            let pageString = await pdfDocument.getPage(i).then(async (page) => {
                                return page.getTextContent().then(async (textContent) => {
                                    var textItems = textContent.items;
                                    var finalString = "";
    
                                    // Concatenate the string of the item to the final string
                                    for (var i = 0; i < textItems.length; i++) {
                                        var item = textItems[i];
    
                                        finalString += item.str + " ";
                                    }
    
                                    // Solve promise with the text retrieven from the page
                                    return finalString
                                });
                            });
                            
                            final += " " + pageString
                        }
                        return final
                    });

                    console.log(pdfText)

                    let poNumber = "" , doDate = "" , doNumber = ""

                    if(pdfText.match(/PO\s+No\.\s+:\s*(?<ponumber>\d+)/i)){
                        poNumber = pdfText.match(/PO\s+No\.\s+:\s*(?<ponumber>\d+)/i).groups.ponumber
                    }
        
                    if(pdfText.match(/No\.?\s+:\s+(?<donumber>\w{15})\s+Date\s+:\s*(?<dodate>\d{1,2}\-\w{3}\-\d{4})/i)){
                        doDate = moment(pdfText.match(/No\.?\s+:\s+(?<donumber>\w{15})\s+Date\s+:\s*(?<dodate>\d{1,2}\-\w{3}\-\d{4})/i).groups.dodate, "DD-MMM-YYYY").format("YYYY/MM/DD")
                        doNumber = pdfText.match(/No\.?\s+:\s+(?<donumber>\w{15})\s+Date\s+:\s*(?<dodate>\d{1,2}\-\w{3}\-\d{4})/i).groups.donumber
                    }
        
                    let matchItems = pdfText.matchAll(/(?<noitem>\d{1,2})\s+(?<quantity>\d+|\d+.\d+)\s+(?<materialno>\d{10})\s+(?<sitecode>\w{6})\s+(?<UOM>\w+)\s+(?<description>.+?((?=(\s+(\d{1,2})\s+(\d+|\d+.\d+)))|(?=\s+OCK Setia)|(?=\s+RECEIVED)))/gmi)
            
                    let poitem = Array.from(matchItems).map(item => item.groups).map(item => ({ ...{ponumber:poNumber, dodate:doDate, donumber:doNumber},...item }))

                    /*poitem.forEach(item => {
                        item['date'] = moment(item['date'],"DD.MM.YYYY").format("YYYY/MM/DD")
                    })*/
                    
                    //console.log({doDate:doDate, doNumber:doNumber, poNumber: poNumber, items:poitem?poitem:[], data: btoa(reader.result), filename: file.name})
                    resolve({doDate:doDate, doNumber:doNumber, poNumber: poNumber, items:poitem?poitem:[], data: btoa(reader.result), filename: file.name})
                }
                

                reader.readAsBinaryString(file)
            })  
        })

        Promise.all(promise).then((result)=>{
            setItems(result)
            console.log(result)
        })
    }

    let onDropFile = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        let files = evt.dataTransfer.files; 

        handleFileChange(files)
    }

    const pdfWidth = window.innerWidth * 0.8
    return (
        <>
            <div className="dropFileArea" onDragOver={(evt)=>{evt.stopPropagation();evt.preventDefault();evt.dataTransfer.dropEffect = 'copy';}} onDrop={onDropFile}>
                <div style={{display:'flex', height: '40px', verticalAlign:'middle'}}>
                <div style={{padding:'8px'}}>Drop multiple DO PDF files or</div>

                <Button onClick={()=>{
                    fileInput.current.click();
                }}>Select Files</Button>

                <input type="file" ref={fileInput} onChange={(evt)=>{
                    let files = evt.target.files 
                    if(files.length > 0){
                    handleFileChange(files)
                    }
                }} style={{display:'none'}} accept=".pdf" multiple/>
                </div>
                
            </div>

            <div className="actionArea">
                {items.length > 0 && <Button variant="secondary" onClick={()=>{exportCSV()}}>Export to Excel</Button>}
            </div>
                
            <div className="itemsArea">
                {items.length > 0 && <Table size="sm" hover={true}>
                <thead>
                    <tr>
                    <td>Filename</td>
                    <td>DO Number</td>
                    <td>DO Date</td>
                    <td>PO Number</td>
                    <td>Number of items</td>
                    <td></td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,itemIndex) => {
                    return <tr key={itemIndex}>
                        <td>{item.filename}</td>
                        <td>{item.doNumber}</td>
                        <td>{item.doDate}</td>
                        <td>{item.poNumber}</td>
                        <td>{item.items.length}</td>
                        <td>
                        <ButtonGroup size="sm">
                            <Button onClick={()=>{
                            setFileBase64(item.data);
                            setCurrentPage(1)
                            setModalPdf(true);
                            }}>
                            View PDF
                            </Button>
                            <Button onClick={()=>{
                            setViewItem(item.items)
                            setModalItem(true)
                            }}>
                            View Item
                            </Button>
                        </ButtonGroup>
                        
                        
                        </td>
                    </tr>
                    })}
                </tbody>
                </Table>}
            </div>
            
            
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

            <Modal centered scrollable show={modalItem} onHide={()=>{setModalItem(false)}} dialogClassName={'pdf-modal'} size="xl">
                <Modal.Header closeButton>
                <Modal.Title>Items</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                {viewItem.length > 0 && <table className="po-output">
                    <thead>
                    <tr>
                        {Object.keys(viewItem[0]).map((field, fieldid)=>{
                        return <td key={fieldid}>{`${field}\t`}</td>
                        })}
                    </tr>
                    </thead>  
                    <tbody>
                    {viewItem.map((item, itemid)=>{
                        return <tr key={`item_${itemid}`}>
                        {Object.keys(item).map((field, fieldid)=>{
                            return <td key={`item_${itemid}_${fieldid}`}>{`${item[field]}\t`}</td>
                        })}
                        </tr>
                    })}
                    <tr></tr>
                    </tbody>
                </table>}
                </Modal.Body>
            </Modal>
        </>
    )
    
}

export default DO