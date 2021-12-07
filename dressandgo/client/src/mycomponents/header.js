import { Container, Navbar, Form, Row, Col, Button } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";

import { IoWoman, IoMan } from 'react-icons/io5'


function MyHeader(props) {

  return (
    <>
      <Navbar >
        <Link to={{ pathname: "/previews" }}>
          <Button size="sm" onClick={() => props.handleChangeCurrentCategorie("")}>
            BACK
          </Button>
        </Link>

        <Container>
          <Navbar.Brand className='m-auto'>
            <b id="title">Dress&Go</b>
            <sub id="pedice"><i>{props.page}</i></sub>
          </Navbar.Brand>

        </Container>

      </Navbar>
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
    </>
  );
}

export default MyHeader;
