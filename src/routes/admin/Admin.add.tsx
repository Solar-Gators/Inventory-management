import React, { useState } from 'react'
import InventoryItem from '../../components/Admin/InventoryItem'
import Alert from 'react-bootstrap/Alert'
import * as inventoryModel from '../../models/inventory'
 
export default function AdminAddItem() {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

   return (
        <React.Fragment>
            {error ? <Alert variant="danger" className="m-3 text-center">There has been an error creating your item.</Alert> : ""}
            {success ? <Alert variant="success" className="m-3 text-center">Your item was successfully created</Alert> : ""}
            <h1 className="pt-3 text-center">Adding An Item</h1>
            <InventoryItem onSubmit={async (values, formik) => {
                setSuccess(false)
                setError(false)
                try {
                    await inventoryModel.create([
                        {
                            ...values,
                            img: "",
                            lastUpdated: ""
                        }])
                    formik.resetForm()
                    setSuccess(true)
                }
                catch(err) {
                    console.error(err)
                    setError(true)
                }
            }} />
        </React.Fragment>
   )
}
