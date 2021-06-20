import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import * as moment from 'moment'
import { Link } from 'react-router-dom';

import Results from '../components/Results/Results'
import * as inventoryModel from '../models/inventory'

import missingImage from '../content/assets/images/missing-image.png'


export default class SearchResults extends React.Component {

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
            <Results
                results={this.state.results}
                pageCount={this.state.pageCount}
                currentPage={this.state.currentPage}
                search={this.state.search}
                loading={this.state.loading}
                error={this.state.error}
                selectPage={this.selectPage}
            />
        )
    }
}