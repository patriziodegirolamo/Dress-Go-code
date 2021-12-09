import { Col, Row, Container, Button } from "react-bootstrap";
import "../css/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Da MODIFICARE IL DB DEGLI ABITI
function MyProfile(props) {

    return (

        <Container className="mt-4 p-2 justify-content-center">


            <Col className=" image d-flex flex-column justify-content-center align-items-center">

                <Button className="btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></Button>


                <Row className="justify-content-center p-2">  Andrea Birdwhistle </Row>
                <Row className="justify-content-center"> Via dei pioppi 18 </Row>
                <Row className="justify-content-center"> Torino (TO) </Row>

                <Row className="pt-5 justify-content-center"> Height: 78 kg</Row>
                <Row className="justify-content-center"> Weight: 163 cm </Row>
                <Row className="justify-content-center"> Waistline: 23 cm</Row>
                <Row className="justify-content-center"> Hips: 23 cm</Row>
                <Row className="justify-content-center"> Leg length: 45 cm </Row>
                <Row className="pb-4 justify-content-center"> Shoe size: 45 EU </Row>



                <Button className="m-2 justify-content-center"> Edit profile </Button>
                <Button className="m-2 justify-content-center"> Handle know sizes </Button>
                <Button className="m-2 justify-content-center"> Payment methods </Button>






            </Col>


        </Container>

    );
}
export default MyProfile;