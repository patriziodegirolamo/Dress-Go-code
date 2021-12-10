import { Container, Navbar, Form, Row, Col, Button } from "react-bootstrap";
import { NavLink as Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";

import { IoWoman, IoMan } from 'react-icons/io5'


function MyHeader(props) {
  const navigate = useNavigate();

  const handleChangeBackardPage = () => {
    if (props.currentState == "home") {
    }

    else if (props.currentState == "cat") {
      props.setCurrentCat("");
      props.setCurrentState("home");
      navigate("/previews");
    }

    else if (props.currentState == "bigCat") {
      props.setCurrentState("cat");
      navigate("dresses/" + props.currentCat);
    }
  };


  return (
    <>
      <Navbar >
        {/** TODO: IMPLEMENTARE TASTO BACK UTILIZZANDO LA USELOCATION e capire se serve o meno */}
        {!props.currentCat ?
          <></>
          :
          <Button size="sm" onClick={handleChangeBackardPage}>
            BACK
          </Button>
        }
        <Container>
          <Navbar.Brand className='m-auto'>
            <b id="title">Dress&Go</b>
            <sub id="pedice"><i>{props.page}</i></sub>
          </Navbar.Brand>

        </Container>

      </Navbar>

      {props.currentState == "home" || props.currentState == "cat" ? 
      <Container>
        <Row>
          <Col xs={7}>
            <Form>
              <Form.Control placeholder="Search..." />
            </Form>
          </Col>

          {
            props.page === "man" ?
              <Col xs={2}>
                <Button variant="light" disabled>
                  <IoMan></IoMan>
                </Button>
              </Col>
              :
              <Col xs={2}>
                <Button variant="light" onClick={(event) => {
                  props.setPage("man")
                }}>
                  <IoMan></IoMan>
                </Button>
              </Col>
          }

          {
            props.page === "woman" ?
              <Col xs={2}>
                <Button variant="light" disabled>
                  <IoWoman></IoWoman>
                </Button>
              </Col>
              :
              <Col xs={2}>
                <Button variant="light" onClick={(event) => {
                  props.setPage("woman")
                }}>
                  <IoWoman></IoWoman>
                </Button>
              </Col>
          }

        </Row>
      </Container>
      : <></>}
    </>
  );
}

export default MyHeader;
