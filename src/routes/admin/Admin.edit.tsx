import React, { useState, useEffect } from 'react'
import * as inventoryModel from '../../models/inventory'
import InventoryItem from '../../components/Admin/InventoryItem'
import Results from '../../components/Results/Results'
import Alert from "react-bootstrap/Alert"

import { MemoryRouter, Route } from 'react-router-dom';

function AdminEditItem(props) {
    const [inventoryToEdit, setInventoryToEdit] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        inventoryModel.findOne(props.match.params.id)
        .then((response) => {
            setInventoryToEdit(response)
            setLoading(false)
        })

        //TODO: handle loading error
    })

    if (loading) return <p>Loading</p>
    
    return <React.Fragment>
            <h1 className="pt-3 text-center">Editing An Item</h1>
            <InventoryItem onSubmit={async (values, formik) => {
                inventoryModel.edit({
                    _id: props.match.params.id,
                    lastUpdated: inventoryToEdit.lastUpdated,
                    img: "",
                    ...values
                })
                //handle error

                //redirect back to inventory page
                props.editSuccess()
            }} initialValues={inventoryToEdit} />
        </React.Fragment>
}


export default function AdminEdit() {
    const [loadedItems, setLoadedItems] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [successEdit, setSuccessEdit] = useState(false)

    useEffect(() => {
        inventoryModel.search("", 1)
        .then((response) => {
            setLoadedItems(response)
            setLoading(false)
        })
        //TODO: handle loading error
    })

    const RESULT_COUNT = 6

    let results = []
    let startPage = currentPage*RESULT_COUNT
    for (let index = startPage; index < startPage + RESULT_COUNT; index++) {
        if (loadedItems[index]) {
            results.push(loadedItems[index])
        }
    }

    return <MemoryRouter>
                { successEdit ? <Alert variant="success">Item edited</Alert>  : "" }
                <Route exact path={["/", "/results/:search", "/results"]} component={(props) => {
                    return <Results
                                results={results}
                                pageCount={Math.ceil(loadedItems.length/RESULT_COUNT)}
                                currentPage={currentPage}
                                search={""}
                                selectPage={(pageNumber) => {
                                    setCurrentPage(pageNumber)
                                }}
                                loading={loading}
                                error={false} />
                }} />
                <Route exact path={["/result/:search/:id", "/result/:id"]} render={(props) => {
                    return <AdminEditItem {...props} editSuccess={() => {
                        props.history.push("/")
                        setSuccessEdit(true)
                    }} />
                }} />
            </MemoryRouter>
}