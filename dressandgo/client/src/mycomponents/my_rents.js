import { Row, Container, Spinner, InputGroup, Dropdown, DropdownButton, Col } from "react-bootstrap";
import { useState } from 'react';
import { Rent } from "./rent.js"
import "bootstrap/dist/css/bootstrap.min.css";

function FilterRentsDropdown(props) {
    const handleArriving = () => {
       const arrivingRents = props.rents.filter(rent => rent.status === "ARRIVING");
       props.setFilterRents([]);

       arrivingRents.forEach((rent) => {
           props.setFilterRents(oldList => {
               return oldList.concat(rent);
           })
       })
    }

    const handleArrived = () => {
        const arrivedRents = props.rents.filter(rent => rent.status === "ARRIVED");
        props.setFilterRents([]);

       arrivedRents.forEach((rent) => {
           props.setFilterRents(oldList => {
               return oldList.concat(rent);
           })
       })
        
    }

    const handleReturning = () => {
        const returningRents = props.rents.filter(rent => rent.status === "RETURNING");
        props.setFilterRents([]);

        returningRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })
         
    }

    const handleReturned = () => {
        const returnedRents = props.rents.filter(rent => rent.status === "RETURNED");
        props.setFilterRents([]);

        returnedRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })
         
    }

    const handleClosed = () => {
        const closedRents = props.rents.filter(rent => rent.status === "CLOSED");
        props.setFilterRents([]);

        closedRents.forEach((rent) => {
            props.setFilterRents(oldList => {
                return oldList.concat(rent);
            })
        })
         
    }

    const handleRemove = () => {
        props.setFilterRents([]);
    }


    return (
        <InputGroup className="mb-3">
            <DropdownButton
                variant="outline-secondary"
                title="Filter by status"
                id="sort"
            >
                <Dropdown.Item onClick={handleArriving}>Arriving</Dropdown.Item>
                <Dropdown.Item onClick={handleArrived}>Arrived</Dropdown.Item>
                <Dropdown.Item onClick={handleReturning}>Returning</Dropdown.Item>
                <Dropdown.Item onClick={handleReturned}>Returned</Dropdown.Item>
                <Dropdown.Item onClick={handleClosed}>Closed</Dropdown.Item>
                <Dropdown.Item onClick={handleRemove}>Remove filters</Dropdown.Item>
            </DropdownButton>
        </InputGroup>
    )
}



function MyRents(props) {
    const [filterRents, setFilterRents] = useState([]);

    console.log(filterRents)
    console.log(props.rents)

    return <>

        <Container fluid>
            {
                props.dirty ? <Container id="containerSpinner">
                    <Spinner animation="border" variant="primary" />
                </Container> : <>

                    <Container>
                        <Row className="pt-2">
                            <Col>
                            <h3 className="mt-1" style={{ textAlign: "center" }}>MY RENTS</h3>
                            </Col>
                            <Col>
                            <FilterRentsDropdown filterRents={filterRents} setFilterRents={setFilterRents} rents = {props.rents}/>
                            </Col>
                        </Row>
                    </Container>
                    {
                        filterRents === undefined || filterRents.length === 0 ?

                            props.rents.map((x, idx) => {
                                return <Row key={idx}>
                                    <Rent myrent={x} adsImages={props.adsImages} ads={props.ads}
                                        conversations={props.conversations}
                                        setCurrentState={props.setCurrentState}
                                        setHistoryStack={props.setHistoryStack} historyStack={props.historyStack}></Rent>
                                </Row>
                            })

                            :

                            filterRents.map((x, idx) => {
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