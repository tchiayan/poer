import React from 'react'

import { PDFReader } from 'reactjs-pdf-reader';

// Bootstrap
import { Button , Modal, Table, ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Semantic
import { Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

// moment.js
import * as moment from 'moment';

// Exceljs
import Excel from 'exceljs';

function PO(){

    let [ fileBase64 , setFileBase64 ] = React.useState(null)
    let [ viewItem , setViewItem ] = React.useState([])
    let [ modalItem , setModalItem ] = React.useState(false)
    let [ page, setPage ] = React.useState(1)
    let [ currentPage, setCurrentPage ] = React.useState(1)
    let [ modalPdf , setModalPdf ] = React.useState(false)
    let [ items , setItems ] = React.useState([])
    let [ vendor , setVendor ] = React.useState("webe")

    const vendorConfig = {
        webe:{
            poNumber : /PO\s+Number\s+:\s*(?<ponumber>\d+)/, 
            poDate: /PO\s+Date\s+:\s*(?<podate>[\d]+[\.|\-|\\][\d]+[\.|\-|\\][\d]+)/, 
            items: /(?<item>\d{1,2})\s(?<materialno>\d{10})\s(?<description>.+?)\s(?<date>\d{1,2}\.\d{1,2}\.\d{4})\s(?<quantity>\d+|\d+.\d+)\s(?<quantifier>\w+)\s(?<unitprice>\d+\,?\d*\.\d{2})\s(?<totalprice>\d*\,?\d+\.\d{2})/gm
        },
        ericssondigi:{
            poNumber: /Purchase Order\s*(?<ponumber>\d{10})/,
            poDate: /Date\s*(?<podate>\d{2}\.\d{2}\.\d{4})\s*\(DD\.MM\.YYYY\)/,
            items: /\s(?<itemno>\d{5})\s+(?<description>.{1,30})\s+(?<quantity>\d+\.{0,1}\d{0,})\s+(?<unit>\w+)\s+(?<unitprice>\d+(\,\d{3}){0,}\.\d{2})\s+(?<linevalue>\d+(\,\d{3}){0,}\.\d{2})\s+(?<siteid>\d{4}\w(\_\d){0,1})/gm
        }
    }
    let fileInput = React.createRef()

    let toColumnName = (num) => {
        for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        }
        return ret;    
    }

    let exportCSV = () => {
        let content = []
        let totalItems = items.flatMap(item => item.items)
        content = totalItems.map(lineItem => Object.values(lineItem))

        if(content.length > 0){
        let wb = new Excel.Workbook()
        let ws = wb.addWorksheet("PO")
        ws.addRow(Object.keys(totalItems[0]))
        console.log(Object.keys(totalItems[0]))
        console.log(content)

        Object.keys(totalItems[0]).forEach((column,index) => {
            if(column.match(/date/g)){
                console.log(`Convert column ${index+1} to date format`)
                ws.getColumn(`${toColumnName(index+1)}`).numFmt = "d-mmm-yy"
                content.forEach(row => {
                    row[index] = moment.utc(row[index], 'YYYY/MM/DD').toDate()
                })
            }
        })
        ws.addRows(content)

        
        //content = [Object.keys(totalItems[0]).join(","), ...content]
        wb.xlsx.writeBuffer().then((buffer) => {
            let blob = new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
            let elem = window.document.createElement("a")
            elem.href = window.URL.createObjectURL(blob)
            elem.download = 'PO_Export.xlsx'
            elem.click()
        })
        }
    }

    let handleFileChange = async (files) => {
        let promise = Array.from(files).map((file)=>{
            return new Promise((resolve)=>{
                let reader = new FileReader()
                reader.onload = (_) => {
                //setFileBase64(btoa(reader.result))
                let pdfText = window.pdf2text(btoa(reader.result))
                console.log(pdfText)
                let [poNumber , poDate] = ["" , ""]

                
                if(pdfText.match(vendorConfig[vendor].poNumber)){    
                    poNumber = pdfText.match(vendorConfig[vendor].poNumber).groups.ponumber
                    console.log(poNumber)
                }

                if(pdfText.match(vendorConfig[vendor].poDate)){
                    poDate = moment(pdfText.match(vendorConfig[vendor].poDate).groups.podate, "DD.MM.YYYY").format("YYYY/MM/DD")
                }

                //setFileText(pdfText)
                let matchItems = pdfText.matchAll(vendorConfig[vendor].items)
                
                let poitem = Array.from(matchItems).map(item => item.groups).map(item => ({ ...{ponumber:poNumber, podate:poDate},...item }))

                poitem.forEach(item => {
                    if('date' in item){
                        item['date'] = moment(item['date'],"DD.MM.YYYY").format("YYYY/MM/DD")
                    }
                })
                
                resolve({poDate:poDate, poNumber: poNumber, items:poitem?poitem:[], data: btoa(reader.result), filename: file.name})
                //setItems(Array.from(matchItems).map(item => item.groups))
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
            <Form style={{marginBottom:'10px'}}>
                <Form.Select label="Select PO type" options={[
                    {key: 'webe', value: 'webe', text: 'Webe PO'},
                    {key: 'ericssondigi', value:'ericssondigi', text: 'Ericssion Digi PO'}
                ]} value={vendor} onChange={(e,{value})=>setVendor(value)}/>
            </Form>
            <div className="dropFileArea" onDragOver={(evt)=>{evt.stopPropagation();evt.preventDefault();evt.dataTransfer.dropEffect = 'copy';}} onDrop={onDropFile}>
                <div style={{display:'flex', height: '40px', verticalAlign:'middle'}}>
                <div style={{padding:'8px'}}>Drop multiple PO PDF files or</div>

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
                    <td>PO Number</td>
                    <td>PO Date</td>
                    <td>Number of items</td>
                    <td></td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,itemIndex) => {
                    return <tr key={itemIndex}>
                        <td>{item.filename}</td>
                        <td>{item.poNumber}</td>
                        <td>{item.poDate}</td>
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

export default PO