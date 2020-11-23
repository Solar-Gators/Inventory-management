import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import SearchField from '../components/SearchField'

export default class Search extends React.Component {
    render() {
        return (
            <Row className="align-items-center" style={{ height: 'calc(100% - 76px)' }}>
                <Col sm={{offset: 5, span: 2}} xs={{offset: 3, span: 7}}>
                    <SearchField />
                </Col>
            </Row>
        )
    }
}
