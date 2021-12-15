import { Row, Container, Card, Button, ButtonGroup, Col } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

function MyKnownSizes(props) {

    const handleDelete = (id_ks) => {
        props.removeASize(id_ks);
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

                    <Card className="mt-1" key={x.id_ks}>
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
                                        <Button variant='outline-danger' onClick={() => handleDelete(x.id_ks)}><BsFillTrashFill /></Button>
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