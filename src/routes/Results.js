import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios'
import ResultsFooter from '../components/ResultsFooter'
import SearchField from '../components/SearchField'

export default class Results extends React.Component {

    state = {
        search: '',
        results: [],
        pageCount: 0,
        currentPage: 0,
        loading: true
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
                return (
                <Row className="border border-secondary align-items-center mx-5 mb-4 text-center" style={{ height: '80px' }}>
                    <Col>
                        <img src={item.img} alt={item.name + " product image" } />
                    </Col>
                    <Col>
                        {item.name}
                    </Col>
                    <Col>
                        {item.lastUpdated}
                    </Col>
                    <Col>
                        {item.location}
                    </Col>
                </Row>)
            })
        }

        else {
            return <p className="text-center">No results found.</p>
        }
    }

    setUpSearch = () => {
        this.setState({ search: this.props.match.params.search }, () => {
            this.selectPage(0)
        })
    }

    selectPage = (page) => {
        this.setState({loading: true})
        axios.get('/api/inventory', {
            params: {
                search: this.state.search,
                pageNumber: page
            }
        })
        .then(({data: response}) => {
            this.setState({
                results: response.results,
                pageCount : response.totalPages,
                currentPage: page,
                loading: false
            })
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
                        Last Updated
                    </Col>
                    <Col>
                        Location
                    </Col>
                </Row>
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

        )
    }
}
