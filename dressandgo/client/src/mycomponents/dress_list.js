<<<<<<< HEAD
import { Col, Row, Container, Spinner } from "react-bootstrap";
import { MySmallAdvertisement } from "./dress_card.js"
=======
import { Col, Row, Container } from "react-bootstrap";
import {MySmallAdvertisement} from "./dress_card.js"
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d

function MyDressList(props) {
    return (
        <>
<<<<<<< HEAD
            {props.ads.length === 0 ? <>Sorry, there are no results related to your search!</> : <>
                {
                    props.dirty ?
                        <Container id="containerSpinner">
                            <Spinner animation="border" variant="primary" />
                        </Container> : <>
                            <Container>
                                <Row xs={2} md={2} className="g-4">
                                    {props.ads.map((ad, idx) => {
                                        return <Col key={idx}>
                                            <MySmallAdvertisement adsImages={props.adsImages.filter((el) => el.id_a === ad.id_a)} idx={idx} ad={ad} categories={props.categories}
                                                handleChangeForwardPage={props.handleChangeForwardPage} />

                                        </Col>
                                    })}
                                </Row>
                            </Container>
                        </>}
            </>}
=======
            <Container>
                <Row xs={2} md={2} className="g-4">
                  {props.ads.map( (ad, idx) => {
                      return <Col key={idx}>
                        <MySmallAdvertisement adsImages = {props.adsImages.filter((el) => el.id_a === ad.id_a)} idx={idx} ad={ad} categories={props.categories}
                        handleChangeForwardPage={props.handleChangeForwardPage}/>
                        
                      </Col>
                  })}
                </Row>
            </Container>
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
        </>
    );
}
export default MyDressList;