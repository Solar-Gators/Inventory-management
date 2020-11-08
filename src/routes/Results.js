import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Skeleton from 'react-loading-skeleton';


function ResultsFooter({ total, current, selectPage }) {

    //Prevent a new page from being selected twice selecting twice 
    let resultRefreshing = false
    let raceConditionSelectPage = (selected) => {
        if (!resultRefreshing) {
            resultRefreshing = true
            selectPage(selected)
        }
    }


    let footer = [
        <i
            onClick={() => { if (current !== 0) raceConditionSelectPage(current - 1)} }
            className={`fas fa-arrow-left pr-3 ${ current !== 0 ? 'result-footer-selected' : ''}`} />
    ]

    //in case the inventory happen to be updated
    if (current > total) {
        current = total
    }

    let loopTotal = total
    let totalOffset = 0

    //handle shifting of numbers for large page count
    if (total > 5) {
        loopTotal = 5

        if (current > 3) {
            //if the remaining pages are less than 3
            totalOffset = total - current <= 3
                ? total - 5 //set the offset to the last 5 pages
                : current - 2 //otherwise shift by 2
        }
    }

    //create number range
    for (let i = 0; i < loopTotal; i++) {
        let currentIndex = totalOffset + i
        footer.push(
            <span
                onClick={() => raceConditionSelectPage(currentIndex)}
                className={`px-2 ${currentIndex !== current ? 'result-footer-selected' : ''}`} style={{fontSize: '20px'}}>
                {currentIndex + 1}
            </span>
        )
    }
    footer.push(
        <i
            onClick={() => { if (current !== total - 1) raceConditionSelectPage(current + 1)}}
            className={`fas fa-arrow-right pl-3 ${ current !== total - 1 ? 'result-footer-selected' : ''}`}></i>
    )

    return footer

}

export default class Results extends React.Component {

    state = {
        search: 'Soldering Iron',
        results: [],
        pageCount: 0,
        currentPage: 0,
        loading: true
    }

    componentDidMount() {
        this.selectPage(0)
    }

    selectPage = (page) => {
        this.setState({loading: true})
        setTimeout(() => {
            let results = []

            for (let i = 0; i < 6; i++) {
                results.push(            {
                    name: 'Pinsun Soldering Iron 60W',
                    lastUpdated: '2/01/2019',
                    img: '',
                    location: 'Bin A'
                })
            }
    
            this.setState({
                    results: results,
                    pageCount : 30,
                    currentPage: page,
                    loading: false
                })
        }, 300)
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={{span: 2}} className="mx-5 my-3">
                        <Form inline>
                            <Form.Group controlId="formSearch">
                                <Form.Label className="pr-2"><i class="fas fa-search"></i></Form.Label>
                                <Form.Control type="text" placeholder="Search" defaultValue={this.state.search} />
                            </Form.Group>
                        </Form>
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
                    this.state.results.map((item) => {
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
                <Row>
                    <Col sm={{ offset: 4, span: 4 }} className="text-center user-select-none">
                        <ResultsFooter
                            total={this.state.pageCount}
                            current={this.state.currentPage}
                            selectPage={this.selectPage}
                            />
                    </Col>
                </Row>
            </React.Fragment>

        )
    }
}
