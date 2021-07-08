import React, { useState, useEffect } from 'react'
import * as inventoryModel from '../../models/inventory'
import InventoryItem from '../../components/Admin/InventoryItem'
import SearchInventory from '../../components/Results/SearchInventory'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert"

import { MemoryRouter, Route } from 'react-router-dom';

function AdminEditItem({ match, editSuccess }) {
    const [inventoryToEdit, setInventoryToEdit] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        inventoryModel.findOne(match.params.id)
        .then((response) => {
            setInventoryToEdit(response)
            setLoading(false)
        })
    }, [])

    if (loading) return <p>Loading</p>
    
    return <React.Fragment>
                { error ? <Alert variant="danger" className="text-center">{ errorMessage }</Alert>  : "" }
                <Link to={`/results/${match.params.search ?? ""}`}>
                    <Button className="pull-left mt-3 ml-4" variant="outline-primary" size="sm">Return to Search</Button>
                </Link>
                <h1 className="pt-3 text-center">Editing An Item</h1>
                <InventoryItem onSubmit={async (values, formik) => {
                    inventoryModel.edit({
                        _id: match.params.id,
                        lastUpdated: inventoryToEdit.lastUpdated,
                        image: inventoryToEdit.image,
                        ...values
                    })
                    .then((response) => {
                        if (response.success) {
                            return editSuccess()
                        }
                        
                        //display error
                        setErrorMessage(response.message)
                        setError(true)
                    })
                    
                }} initialValues={inventoryToEdit} />
        </React.Fragment>
}


export default function AdminEdit() {
    const [successEdit, setSuccessEdit] = useState(false)

    return <MemoryRouter>
                { successEdit ? <Alert variant="success" className="text-center">Item edited</Alert>  : "" }
                <Route exact path={["/", "/results/:search", "/results"]} component={(props) => {
                    return <SearchInventory search={props.match.params.search ?? ""} />
                }} />
                <Route exact path={["/result/:search/:id", "/result/:id"]} render={(props) => {
                    setSuccessEdit(false)
                    return <AdminEditItem {...props} editSuccess={() => {
                        props.history.push("/")
                        setSuccessEdit(true)
                    }} />
                }} />
            </MemoryRouter>
}