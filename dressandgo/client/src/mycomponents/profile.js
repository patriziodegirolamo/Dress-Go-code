import { Col, Row, Container, Figure, Button } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import "../css/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Da MODIFICARE IL DB DEGLI ABITI
function MyProfile(props) {

    return (
        <Container fluid>
            <Row className="pt-3 justify-content-md-center text-center">
                <Figure className="justify-content-center">
                    <Figure.Image
                        width={141}
                        height={150}
                        alt="171x180"
                        src="https://i.imgur.com/wvxPV9S.png"
                    />
                    <Figure.Caption>
                        Andrea Birdwhistle
                    </Figure.Caption>
                    <Figure.Caption>
                        @andrew19
                    </Figure.Caption>
                </Figure>
                <Typography component="legend">Your rating based by 344 votes</Typography>
                <Typography>
                    <Rating align="center" name="no-value" value={4} />
                </Typography>
            </Row>
            <Row className="pt-5">
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm">
                        Edit profile
                    </Button>
                    <Button variant="primary" size="sm">
                        Handle know sizes
                    </Button>
                    <Button variant="primary" size="sm">
                        Payment methods
                    </Button>
                </div>
            </Row>
        </Container>
    );
}
export default MyProfile;