import { Row, Container, Card, Button, ButtonGroup, Col, Modal } from "react-bootstrap";
import { useState } from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

function MyKnownSizes(props) {

    const [show, setShow] = useState(false);
    const [currentSize, setCurrentSize] = useState([]);

    const handleClose = (x) =>    
    {
        
        setShow(false);
    }
    const handleShow = (x) => {
        setShow(true);
        setCurrentSize(x);
    }

    const handleDelete = (id_ks) => {
        setShow(false);
        props.removeASize(id_ks.id_ks);
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
                
            {props.knownsizes.map((x, idx) => {
                return (

                    <Card className="mt-1" key={idx}>
                        <Card.Header>
                            <Row>
                                <div className="d-flex justify-content-between">
                                    <Col>
                                        {x.brand}
                                    </Col>
                                    <Col className="text-center justify-content-center">
                                        {props.categories.find((el) => el.id_cat === x.id_cat).name}
                                    </Col>
                                    <Col className="text-center justify-content-center">
                                        {x.EUsize}
                                    </Col>
                                    <ButtonGroup>
                                        <Button variant='outline-danger' onClick={() => handleShow(x)}><BsFillTrashFill /></Button>
                                    </ButtonGroup>
                                </div>
                            </Row>
                        </Card.Header>
                    </Card>)
            })}


            <Modal show={show}>
                        <Modal.Header>
                            <Modal.Title>
                               Confirm action
                            </Modal.Title>

                        </Modal.Header>
                        <Modal.Body>
                        Are you sure to delete know size of {currentSize.brand}? 
                      
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(currentSize)}>
                                Delete
                            </Button>


                        </Modal.Footer>
                    </Modal>        


        </Container>
    );
}
export default MyKnownSizes;