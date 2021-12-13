import { Row, Container, Card, Button, ButtonGroup, Col } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

function MyKnownSizes(props) {

    return (
        <Container fluid>
            <Card className="mt-1">
                <Card.Header>
                    <Row>
                        <div className="d-flex justify-content-between">
                            <Col>
                                Gucci
                            </Col>
                            <Col>
                                T-shirt
                            </Col>
                            <Col>
                            M
                            </Col>
                            <ButtonGroup>
                                <Button variant='outline-danger' onClick={() => { }}>                              >
                                    <BsFillTrashFill/>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Row>
                </Card.Header>
            </Card>
        </Container>
    );
}
export default MyKnownSizes;