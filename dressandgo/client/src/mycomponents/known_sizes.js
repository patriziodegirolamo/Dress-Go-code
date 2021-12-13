import { Row, Container, Card, Button, ButtonGroup, Col } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function MyKnownSizes(props) {

    const deleteSize = (id) => {

        const index = props.knownsizes.findIndex(i => i.id === id);

        if (index > -1) {
            props.setKnownsizes(oldList => {
                return oldList.filter(
                    x => id !== x.id);
            });
        }
    }

    return (
        <Container fluid>

            {props.knownsizes.length === 0 ? (<></>) : (


                <Row className="p-3">
                    <Col className="text-center justify-content-center">
                        <b>BRAND</b>
                    </Col>
                    <Col className="text-center justify-content-center">
                        <b>CATEGORY</b>
                    </Col>
                    <Col className="text-center justify-content-center">
                        <b>SIZE</b>
                    </Col>
                    <Col></Col>
                </Row>)}


            {props.knownsizes.map(x => {
                return (

                    <Card className="mt-1" key={x.id}>
                        <Card.Header>
                            <Row>
                                <div className="d-flex justify-content-between">
                                    <Col>
                                        {x.brand}
                                    </Col>
                                    <Col className="text-center justify-content-center">
                                        {x.category}
                                    </Col>
                                    <Col className="text-center justify-content-center">
                                        {x.size}
                                    </Col>
                                    <ButtonGroup>
                                        <Button variant='outline-danger' onClick={() => { deleteSize(x.id); }}><BsFillTrashFill /></Button>
                                    </ButtonGroup>
                                </div>
                            </Row>
                        </Card.Header>
                    </Card>)
            })}
        </Container>
    );
}
export default MyKnownSizes;