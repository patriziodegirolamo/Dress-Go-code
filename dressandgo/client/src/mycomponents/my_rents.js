import { Row, Container, Spinner } from "react-bootstrap";
import { Rent } from "./rent.js"
import "bootstrap/dist/css/bootstrap.min.css";

function MyRents(props) {
    return <>

        <Container fluid>
            {
                props.dirty ? <Container id="containerSpinner">
                    <Spinner animation="border" variant="primary" />
                </Container> : <>

                <Container>
                <Row className="pt-2">
          <h3 style={{ textAlign: "center" }}>MY RENTS</h3>
        </Row>
                </Container>

                    {props.rents.map((x, idx) => {
                        return <Row key={idx}>
                            <Rent myrent={x} adsImages={props.adsImages} ads={props.ads}
                                conversations={props.conversations}
                                setCurrentState={props.setCurrentState}
                                setHistoryStack={props.setHistoryStack} historyStack={props.historyStack}></Rent>
                        </Row>
                    })}
                </>}

        </Container>

    </>
}
export default MyRents;