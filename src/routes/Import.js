import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import axios from 'axios';

export default class Search extends React.Component {

    state = {
        itemDropped: false
    }

    render() {
        return (
            <Row className="align-items-center" style={{ height: 'calc(100% - 76px)' }}>
                <Col md={{span: 4, offset: 4}}>
                    <Dropzone onDrop={async (acceptedFile, rejectedFile) => {

                        let csv = await acceptedFile[0].text()
                        let json = Papa.parse(csv, { header: true, skipEmptyLines: 'greedy' })
                        let rows = json.data
                        axios.post("https://api.ufsolargators.org/api/inventory", {
                            inventory: rows
                        })
                    }}
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
        )
    }
}
