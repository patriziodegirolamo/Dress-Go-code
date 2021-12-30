import { Row, Container } from "react-bootstrap";
import { Rent } from "./rent.js"
import "bootstrap/dist/css/bootstrap.min.css";

function MyRents(props) {
    return (
        <Container fluid>

            {props.rents.map((x, idx) => {
                return <Row key={idx}>
                    <Rent myrent={x} ads={props.ads}
                    conversations={props.conversations}
                    setCurrentState={props.setCurrentState}
                    setHistoryStack={props.setHistoryStack} historyStack={props.historyStack}></Rent>
                </Row>
            })}

        </Container>
    );
}
export default MyRents;