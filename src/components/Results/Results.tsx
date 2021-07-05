import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Skeleton from 'react-loading-skeleton'
import moment from 'moment'
import { Link } from 'react-router-dom';
import * as inventoryModel from "../../models/inventory"

import ResultsFooter from '../ResultsFooter'
import SearchField from '../SearchField'
import missingImage from '../../content/assets/images/missing-image.png'

interface Results_Props {
    results: inventoryModel.InventoryItem[],
    pageCount: number,
    currentPage: number,
    selectPage: (pageNumber: number) => void,
    search: string,
    loading: boolean,
    error: boolean
}


export default function Results({
    results,
    pageCount,
    currentPage,
    selectPage,
    search,
    loading,
    error
}: Results_Props) {
    return (
        <React.Fragment>
            <Row>
                <Col md={{span: 2}} className="mx-5 my-3">
                    <SearchField defaultValue={search} />
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

            {error ? 
                <p className="text-center">There has been an internal error while handling your request. Please try again later</p>
                :
                <React.Fragment>
                    {loading ?
                        <div className="mx-5">
                            <Skeleton count={6} height={76} className="mb-4" />
                        </div>
                        :
                        (() => {
                            if (results.length === 0) {
                                return <p className="text-center">No results found.</p>
                            }

                            return results.map((item) => {
                                let toUrl = "/result/"
                
                                if (search) {
                                    toUrl += search + "/"
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
                        })()
                    }

                    {pageCount > 1 ? 
                            <Row>
                                <Col sm={{ offset: 4, span: 4 }} className="text-center user-select-none">
                                    <ResultsFooter
                                        total={pageCount}
                                        current={currentPage}
                                        selectPage={selectPage}
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
