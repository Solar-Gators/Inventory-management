import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';


export interface Inventory {
    name: string,
    location: string,
    system: string,
    subSystem: string,
    quantity: number,
    description: string
}


export default function InventoryItem({initialValues, onSubmit}: { initialValues?: Inventory, onSubmit: (values: Inventory, formik) => void   }) {

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
           name: Yup.string()
               .required(),
           location: Yup.string(),
           system: Yup.string(),
           subsystem: Yup.string(),
           quantity: Yup.number()
               .min(1, "Must be greater than 1"),
           description: Yup.string()
        }),
        onSubmit: async values => onSubmit(values, formik)
      })

    return <Form className="px-5 pt-2" onSubmit={formik.handleSubmit}>
    <Form.Row>
        <Form.Group as={Col} controlId="formTitle">
            <Form.Label>Name</Form.Label>
            <Form.Control
                id="name"
                name="name"
                placeholder="Enter Item Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                isInvalid={formik.touched.name && !!formik.errors.name} />
            <Form.Control.Feedback type="invalid">
                {formik.errors.name}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Location</Form.Label>
            <Form.Control
                id="location"
                name="location"
                placeholder="Enter Item Location"
                onChange={formik.handleChange}
                value={formik.values.location}
                isInvalid={formik.touched.location && !!formik.errors.location} />
            <Form.Control.Feedback type="invalid">
                {formik.errors.location}
            </Form.Control.Feedback>
        </Form.Group>
    </Form.Row>

    <Form.Row>
        <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>System</Form.Label>
            <Form.Control
                id="system"
                name="system"
                placeholder="Enter System"
                onChange={formik.handleChange}
                value={formik.values.system}
                isInvalid={formik.touched.system && !!formik.errors.system} />
            <Form.Control.Feedback type="invalid">
                {formik.errors.system}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Subsystem</Form.Label>
                <Form.Control
                    id="subSystem"
                    name="subSystem"
                    placeholder="Enter Sub System"
                    onChange={formik.handleChange}
                    value={formik.values.subSystem}
                    isInvalid={formik.touched.subSystem && !!formik.errors.subSystem} />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.subSystem}
                </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={2} lg={1} controlId="formGridAddress1">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter Quantity"
                onChange={formik.handleChange}
                value={formik.values.quantity}
                isInvalid={formik.touched.quantity && !!formik.errors.quantity} />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.quantity}
                </Form.Control.Feedback>
        </Form.Group>
    </Form.Row>

    <Form.Row>
        <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Description</Form.Label>
            <Form.Control
                id="description"
                name="description"
                as="textarea"
                onChange={formik.handleChange}
                value={formik.values.description}
                isInvalid={formik.touched.description && !!formik.errors.description} />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                </Form.Control.Feedback>
        </Form.Group>
    </Form.Row>

    <Button variant="primary" type="submit">Add</Button>
</Form>
}

InventoryItem.defaultProps = {
    initialValues: {
        name: '',
        location: '',
        system: '',
        subSystem: '',
        quantity: 1,
        description: ''
    }
}
