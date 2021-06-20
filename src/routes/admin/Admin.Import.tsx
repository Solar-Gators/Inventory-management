import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import Button from 'react-bootstrap/esm/Button';
import { MemoryRouter, Route } from 'react-router-dom';
import Results from '../../components/Results/Results'
import Result from '../../components/Results/Result'
import * as inventoryModel from '../../models/inventory'

function UploadZone({uploadCsv}) {
    return <Row className="align-items-center" style={{ height: 'calc(100% - 76px)' }}>
                <Col md={{span: 4, offset: 4}}>
                    <Dropzone
                        onDrop={uploadCsv}
                        accept=".csv"
                    >
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps({className: 'dropzone'})} style={{ height: '200px' }}>
                                <input {...getInputProps()} />
                                <p className="m-auto">Drop Excel Sheet Here, or click to select file.</p>
                                <em className="mb-auto">(only .csv is accepted)</em>
                            </div>
                        )}
                    </Dropzone>
                </Col>
            </Row>
}

function UploadedResults({ loadedItems }) {
    const RESULT_COUNT = 6

    const [currentPage, setCurrentPage] = useState(0)
    let results = []
    let startPage = currentPage*RESULT_COUNT
    for (let index = startPage; index < startPage + RESULT_COUNT; index++) {
        if (loadedItems[index]) {
            results.push(loadedItems[index])
        }
    }
    
    

    return <MemoryRouter>
            <Route exact path={["/", "/results/:search", "/results"]} component={(props) => {
                return <Results
                            results={results}
                            pageCount={Math.ceil(loadedItems.length/RESULT_COUNT)}
                            currentPage={currentPage}
                            search={""}
                            selectPage={(pageNumber) => {
                                console.log(pageNumber)
                                setCurrentPage(pageNumber)
                            }}
                            loading={false}
                            error={false} />
            }} />
            <Route exact path={["/result/:search/:id", "/result/:id"]} render={(props) => {
                return <Result
                            details={loadedItems[props.match.params.id]}
                            loading={false}
                            error={false}
                            search={""} />
            }} />
            
        </MemoryRouter>
}

export default class AdminImport extends React.Component {

    state = {
        itemDropped: false,
        loadedItems: [],
        page: 1
    }
    
    /**
     * Handles event when a CSV gets uploaded to the browser
     */
    uploadCsv = async (acceptedFile, rejectedFile) => {
        let csv = await acceptedFile[0].text()
        let json = Papa.parse(csv, { header: true, skipEmptyLines: 'greedy' })
        let rows = json.data
        for (let index = 0; index < rows.length; index++) {
            let row = rows[index]
            for (let key of ["name", "description", "quantity", "img", "subSystem", "system", "updatedBy", "location"])
            {
                if (!(key in row)) {
                    //TODO: error
                    console.log(key, row)
                    console.error("ERRROR")
                    return
                }
            }
            row._id = index
        } 

        this.setState({ itemDropped: true, loadedItems: rows })
    }

    /**
     * Handles saving the file
     */
    saveFile = () => {
        inventoryModel.create(this.state.loadedItems)
    }

    render() {

        let { itemDropped, loadedItems } = this.state

        return (
            itemDropped ?
                <React.Fragment>
                    <h2 className="text-center mt-3">Imported items are below</h2>
                    <UploadedResults loadedItems={loadedItems} />
                    <div className="text-center">
                        <Button size="lg" onClick={this.saveFile}>Save Uploaded File</Button>
                    </div>
                </React.Fragment>
                
                : <UploadZone uploadCsv={this.uploadCsv} />
        )
    }
}
