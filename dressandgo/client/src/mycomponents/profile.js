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
<<<<<<< HEAD
        const str ="[\"editProfile\"]"
=======
        const str = "[" + "\"editProfile\"" + "]" 
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
        props.setCurrentState("editProfile");
        localStorage.setItem("currentState","editProfile" );
        localStorage.setItem("historyStack", [...props.historyStack, str])
        props.setHistoryStack(() => ([...props.historyStack, "editProfile"]))
    }

    const onClickHandlerKS = () => {
<<<<<<< HEAD
        const str = "[\"ks\"]"
        props.setCurrentState("ks");
        localStorage.setItem("currentState","ks" );
        localStorage.setItem("historyStack", [str])
=======
        const str = "[" + "\"ks\"" + "]" 
        props.setCurrentState("ks");
        localStorage.setItem("currentState","ks" );
        localStorage.setItem("historyStack", [...props.historyStack, str])
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
        props.setHistoryStack(() => ([...props.historyStack, "ks"]))
    }

    return (
<<<<<<< HEAD
        <Container fluid className="h-100">
=======
        <Container fluid>
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
            <Row className="pt-3 justify-content-center text-center">
                <Figure >
                    <Figure.Image
                        width={141}
                        height={150}
                        alt="171x180"
<<<<<<< HEAD
                        src="/boss.png"
=======
                        src="https://i.imgur.com/wvxPV9S.png"
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
                    />
                    <Figure.Caption>
                        {props.user.name} {props.user.surname}
                    </Figure.Caption>
                    <Figure.Caption>
                        @{props.user.name}
                    </Figure.Caption>
                </Figure>
                <Typography component="legend">Your rating based by 344 votes</Typography>
                <Typography>
                    <Rating align="center" name="no-value" value={4} />
                </Typography>
            </Row>
            <Row className="pt-5 justify-content-center">

                <Link onClick={onClickHandlerEdit} className=" my-2 btn btn-primary btn-md w-75 " role="button" to="/editprofile">
                    Edit profile
                </Link>

                <Link onClick={onClickHandlerKS}className="btn btn-primary btn-md w-75 justify-content-center" role="button" to="/handleknownsizes" >
<<<<<<< HEAD
                    Handle known sizes
                </Link>

                <Button  className="my-2 btn btn-primary btn-md w-75" >
                    Payment methods
                </Button>

                <Button  className="my-5 btn btn-secondary btn-md w-75" >
                    LOGOUT
                </Button>

=======
                    Handle know sizes
                </Link>

                <Button disabled className="my-2 btn btn-primary btn-md w-75" >
                    Payment methods
                </Button>

>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
            </Row>
        </Container>
    );
}
export default MyProfile;