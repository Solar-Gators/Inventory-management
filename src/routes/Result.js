import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import * as moment from 'moment'
import missingImage from '../content/assets/images/missing-image.png'
import { Link } from 'react-router-dom'
import * as inventoryModel from '../models/inventory'

export default class Result extends React.Component {

    state = {
        loading: true,
        error: false,
        details: {
            name: null,
            img: null,
            lastUpdated: null,
            location: null
        }
    }

    componentDidMount() {
        inventoryModel.findOne(decodeURIComponent(this.props.match.params.id))
        .then(({data: response}) => {
            this.setState({ details: response, loading: false })
        })
        .catch(() => {
            this.setState({ error: true })
        })



        // setTimeout(() => {
        //     this.setState({loading: false, details: {
        //         name: 'item 1',
        //         img: null,
        //         lastUpdated: new Date(),
        //         location: 'Box A'
        //     }})
        // }, 1000)
    }

    render() {
        let { details, loading, error } = this.state
        return (
            <React.Fragment>
                <Link to={`/results/${this.props.match.params.search ?? ""}`}>
                    <Button className="pull-left mt-3 ml-4" variant="outline-primary" size="sm">Return to Search</Button>
                </Link>
                {
                    loading ?
                    <div className="mx-4">
                        <Row>
                            <Col>
                                <Skeleton height={50} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Skeleton height={400} />
                            </Col>
                            <Col>
                                <Skeleton height={100} count={4} />
                            </Col>
                        </Row>
                    </div>
                    :
                    error ? <p>There was an error loading the item.</p> : 
                    <React.Fragment>
                        <Row>
                            <Col>
                                <h3 className="text-center mt-2 mb-5">{details.name}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <img alt="result" className="img-fluid" src={details.img ?? missingImage} />
                            </Col>
                            <Col>
                                <p>Location: {details.location}</p>
                                <p>Last Updated: {moment(details.lastUpdated).format("DD/MM/YY")}</p>
                                <p>Updated By: Unknown</p>

                                <p className="mt-5">Approximate Location: Coming Soon</p>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

