import { Row, Container, Figure } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import "../css/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Necessito di nome, cognome, dati anagrafici, taglie conosciute

function MyProfile(props) {

    // const { surveys, setSurveyToCompile, setCompiled } = props;

    function handleClick() {

        //setSurveyToCompile(surveys.id_s)
        //setCompiled(false);

    }

    return (
        <Container fluid>
            <Row className="pt-3 justify-content-center text-center">
                <Figure >
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
            <Row className="pt-5 justify-content-center">

                <Link className=" my-2 btn btn-primary btn-md w-75 " role="button" to="/editprofile" onClick={handleClick} >
                    Edit profile
                </Link>

                <Link className="btn btn-primary btn-md w-75 justify-content-center" role="button" to="/handleknownsizes" onClick={handleClick} >
                    Handle know sizes
                </Link>

                <Link className="my-2 btn btn-primary btn-md w-75" role="button" to="/paymentmethods" onClick={handleClick} >
                    Payment methods
                </Link>

            </Row>
        </Container>
    );
}
export default MyProfile;