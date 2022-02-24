import { Row, Container, Figure, Button } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import "../css/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Necessito di nome, cognome, dati anagrafici, taglie conosciute

function MyProfile(props) {

    // const { surveys, setSurveyToCompile, setCompiled } = props;

    const onClickHandlerEdit = () =>{
        const str ="[\"editProfile\"]"
        props.setCurrentState("editProfile");
        localStorage.setItem("currentState","editProfile" );
        localStorage.setItem("historyStack", [...props.historyStack, str])
        props.setHistoryStack(() => ([...props.historyStack, "editProfile"]))
    }

    const onClickHandlerKS = () => {
        const str = "[\"ks\"]"
        props.setCurrentState("ks");
        localStorage.setItem("currentState","ks" );
        localStorage.setItem("historyStack", [str])
        props.setHistoryStack(() => ([...props.historyStack, "ks"]))
    }

    return (
        <Container fluid className="h-100">
            <Row className="pt-3 justify-content-center text-center">
                <Figure >
                    <Figure.Image
                        width={141}
                        height={150}
                        alt="171x180"
                        src="/boss.png"
                    />
                    <Figure.Caption>
                        {props.user.name} {props.user.surname}
                    </Figure.Caption>
                    <Figure.Caption>
                        @{props.user.name}
                    </Figure.Caption>
                </Figure>
                <Typography component="legend">Your rating based on 344 votes</Typography>
                <Typography>
                    <Rating align="center" name="no-value" value={4} />
                </Typography>
            </Row>
            <Row className="pt-5 justify-content-center">

                <Link onClick={onClickHandlerEdit} className=" my-2 btn btn-primary btn-md w-75 " role="button" to="/editprofile">
                    Edit profile
                </Link>

                <Link onClick={onClickHandlerKS}className="btn btn-primary btn-md w-75 justify-content-center" role="button" to="/handleknownsizes" >
                    Handle known sizes
                </Link>

                <Button disabled className="my-2 btn btn-primary btn-md w-75" >
                    Payment methods
                </Button>

                <Button disabled className="my-5 btn btn-secondary btn-md w-75" >
                    LOGOUT
                </Button>

            </Row>
        </Container>
    );
}
export default MyProfile;