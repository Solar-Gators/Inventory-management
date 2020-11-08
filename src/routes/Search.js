import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export default class Search extends React.Component {
    render() {
        return (
            <Row className="align-items-center" style={{ height: 'calc(100% - 76px)' }}>
                <Col md={{offset: 5, span: 2}}>
                    <Form inline action="/results">
                        <Form.Group controlId="formSearch">
                            <Form.Label className="pr-2"><i class="fas fa-search"></i></Form.Label>
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        )
    }
}
