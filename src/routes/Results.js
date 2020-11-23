import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import * as moment from 'moment'
import { Link } from 'react-router-dom';

import ResultsFooter from '../components/ResultsFooter'
import SearchField from '../components/SearchField'
import * as inventoryModel from '../models/inventory'

import missingImage from '../content/assets/images/missing-image.png'


export default class Results extends React.Component {

    state = {
        search: '',
        results: [],
        pageCount: 0,
        currentPage: 0,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.setUpSearch()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.search !== this.props.match.params.search) {
            this.setUpSearch()
        }
    }

    generateRows = () => {

        let results = this.state.results
        if (results.length > 0) {
            return results.map((item) => {
                let toUrl = "/result/"

                if (this.state.search) {
                    toUrl += this.state.search + "/"
                }

                toUrl += item._id

                return (
                <Link to={toUrl} style={{ textDecoration: 'none', color: "black" }}>
                    <Row
                        className="border border-secondary mx-5 mb-4 text-center overflow-hidden result"
                        style={{ height: '80px'}}>
                        <Col className="my-auto mh-100 overflow-hidden" xs={3}>
                            <img height="70px" src={item.img ?? missingImage} alt={item.name + " product image" } />
                        </Col>
                        <Col className="my-auto mh-100 overflow-hidden" xs={3} style={{ textOverflow: 'ellipsis' }}>
                            {item.name}
                        </Col>
                        <Col className="my-auto mh-100 overflow-hidden" xs={3} style={{ textOverflow: 'ellipsis' }}>
                            {item.location}
                        </Col>
                        <Col className="my-auto mh-100 overflow-hidden" xs={3} style={{ textOverflow: 'ellipsis' }}>
                            {moment(item.lastUpdated).format("MM/DD/YY")}
                        </Col>
                    </Row>
                </Link>)
            })
        }

        else {
            return <p className="text-center">No results found.</p>
        }
    }

    setUpSearch = () => {
        this.setState({ search: decodeURIComponent(this.props.match.params.search ?? "") }, () => {
            this.selectPage(0)
            // setTimeout(() => {
            //     this.setState({
            //         results: [
            //             {
            //                 name: 'item 1',
            //                 img: null,
            //                 lastUpdated: new Date(),
            //                 location: 'Box A'
            //             },
            //             {
            //                 name: 'item 2',
            //                 img: null,
            //                 lastUpdated: new Date(),
            //                 location: 'Box B'
            //             }
            //         ],
            //         loading: false
            //     })
            // }, 1000)
        })
    }

    selectPage = (page) => {
        this.setState({loading: true, error: false})
        inventoryModel.search(this.state.search, page)
        .then(({data: response}) => {
            this.setState({
                results: response.results,
                pageCount : response.totalPages,
                currentPage: page,
                loading: false
            })
        })
        .catch(() => {
            this.setState({ error: true })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={{span: 2}} className="mx-5 my-3">
                        <SearchField defaultValue={this.state.search} />
                    </Col>
                </Row>
                <Row className="align-items-center mx-5 text-center" style={{ height: '80px' }}>
                    <Col>
                    </Col>
                    <Col>
                        Name
                    </Col>
                    <Col>
                        Location
                    </Col>
                    <Col>
                        Last Updated
                    </Col>
                </Row>

                {this.state.error ? 
                    <p className="text-center">There has been an internal error while handling your request. Please try again later</p>
                    :
                    <React.Fragment>
                        {this.state.loading ?
                            <div className="mx-5">
                                <Skeleton count={6} height={76} className="mb-4" />
                            </div>
                            :
                            this.generateRows()
                        }

                        {this.state.pageCount > 1 ? 
                                <Row>
                                    <Col sm={{ offset: 4, span: 4 }} className="text-center user-select-none">
                                        <ResultsFooter
                                            total={this.state.pageCount}
                                            current={this.state.currentPage}
                                            selectPage={this.selectPage}
                                            />
                                    </Col>
                                </Row>
                            : ''
                        }
                    </React.Fragment>
                }
            </React.Fragment>

        )
    }
}
