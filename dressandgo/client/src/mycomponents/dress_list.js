import { Col, Row, Container, Card } from "react-bootstrap";
import {MySmallAdvertisement} from "./dress_card.js"

//Da MODIFICARE IL DB DEGLI ABITI
function MyDressList(props) {

    return (
        <>
            <Container>
                <Row xs={2} md={2} className="g-4">
                  {props.ads.map( (ad, idx) => {
                      return <Col key={idx}>
                        <MySmallAdvertisement idx={idx} ad={ad}
                        handleChangeForwardPage={props.handleChangeForwardPage}/>
                        
                      </Col>
                  })}
                </Row>
            </Container>
        </>
    );
}
export default MyDressList;