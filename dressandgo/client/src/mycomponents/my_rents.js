import { Row, Container, Spinner, InputGroup, Dropdown, DropdownButton, Col } from "react-bootstrap";
import { useState } from 'react';
import { Rent } from "./rent.js"
import "bootstrap/dist/css/bootstrap.min.css";

function FilterRentsDropdown(props) {
    const handleArriving = () => {
        props.setFilterActive("ARRIVING");
        const arrivingRents = props.rents.filter(rent => rent.status === "ARRIVING");
        props.setFilterRents([]);

        arrivingRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })
    }

    const handleArrived = () => {
        props.setFilterActive("ARRIVED");
        const arrivedRents = props.rents.filter(rent => rent.status === "ARRIVED");
        props.setFilterRents([]);

        arrivedRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })

    }

    const handleReturning = () => {
        props.setFilterActive("RETURNING");
        const returningRents = props.rents.filter(rent => rent.status === "RETURNING");
        props.setFilterRents([]);

        returningRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })

    }

    const handleReturned = () => {
        props.setFilterActive("RETURNED");
        const returnedRents = props.rents.filter(rent => rent.status === "RETURNED");
        props.setFilterRents([]);

        returnedRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })

    }

    const handleClosed = () => {
        props.setFilterActive("CLOSED");
        const closedRents = props.rents.filter(rent => rent.status === "CLOSED");
        props.setFilterRents([]);

        closedRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })

    }

    const handleRemove = () => {
        props.setFilterActive("nofilter");
        props.setFilterRents([]);
    }


    return (
        <InputGroup className="mb-3">
            <DropdownButton
                variant="outline-secondary"
                title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
              </svg>}
                id="sort"
            >
                <Dropdown.Item disabled >Filter by status:</Dropdown.Item>
                <Dropdown.Item onClick={handleArriving}>Arriving</Dropdown.Item>
                <Dropdown.Item onClick={handleArrived}>Arrived</Dropdown.Item>
                <Dropdown.Item onClick={handleReturning}>Returning</Dropdown.Item>
                <Dropdown.Item onClick={handleReturned}>Returned</Dropdown.Item>
                <Dropdown.Item onClick={handleClosed}>Closed</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleRemove}>Remove filters</Dropdown.Item>
            </DropdownButton>
        </InputGroup>
    )
}



function MyRents(props) {
    const [filterRents, setFilterRents] = useState([]);
    const [filterActive, setFilterActive] = useState("nofilter");


    return <>

        <Container fluid>
            {
                props.dirty ? <Container id="containerSpinner">
                    <Spinner animation="border" variant="primary" />
                </Container> : <>

                    <Container>
                        <Row className="pt-2">
                            <Col xs="8">
                                <h3 className="mt-1" style={{ textAlign: "right" }}>MY RENTS</h3>
                            </Col>
                            <Col>
                                <FilterRentsDropdown filterRents={filterRents} setFilterRents={setFilterRents} rents={props.rents} setFilterActive={setFilterActive} />
                            </Col>
                        </Row>
                        {
                            filterActive !== "nofilter" ? 
                                <Row >
                                    <p className = "text-sm-right" style={{ textAlign: "center" }}>You are filtering by: <i>{filterActive}</i></p>
                                </Row> : <></>
                        }
                    </Container>
                    {
                        filterActive !== "nofilter" ?
                            filterRents === undefined || filterRents.length === 0 ?
                                <Container>
                                    <h6>You doesn't have any order with this status. </h6>
                                </Container>
                                :
                                (
                                filterRents.map((x, idx) => {
                                    return <Row key={idx}>
                                        <Rent myrent={x} adsImages={props.adsImages} ads={props.ads}
                                            conversations={props.conversations}
                                            setCurrentState={props.setCurrentState}
                                            setHistoryStack={props.setHistoryStack} historyStack={props.historyStack}></Rent>
                                    </Row>
                                
                                }))

                                    :

                            props.rents.map((x, idx) => {
                                return <Row key={idx}>
                                        <Rent myrent={x} adsImages={props.adsImages} ads={props.ads}
                                            conversations={props.conversations}
                                            setCurrentState={props.setCurrentState}
                                            setHistoryStack={props.setHistoryStack} historyStack={props.historyStack}></Rent>
                                    </Row>
                            })
   
                    }

                                </>}

                </Container>

    </>
}
        export default MyRents;