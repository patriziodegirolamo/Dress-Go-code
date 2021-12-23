import { Container, Navbar, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";

import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc'




function MyHeader(props) {
  const navigate = useNavigate();

  const handleChangeBackardPage = () => {
    props.setSearch("")
    if (props.currentState === "home") {
    }

    else if (props.currentState === "cat") {
      props.setCurrentCat("");
      props.setCurrentState("home");
      navigate("/previews");
    }

    else if (props.currentState === "bigCat") {
      props.setCurrentState("cat");
      navigate("dresses/" + props.currentCat);
    }
  };


  return (
    <>
      <Navbar >
        {!props.currentCat ?
          <></>
          :
          <Button variant="light" size="sm" onClick={handleChangeBackardPage}>
            <IoArrowBackCircleOutline style = {{ color: "black", fontSize: "2em" }}/>
          </Button>
        }
        <Container>
          <Navbar.Brand className='m-auto'>
            <b id="title">Dress&Go</b>
            <sub id="pedice"><i>{props.page}</i></sub>
          </Navbar.Brand>

        </Container>

      </Navbar>

      {props.currentState === "home" || props.currentState === "cat"  ? 
      <Container>
        <Row>
          <Col xs={7}>
            <Form>
              <Form.Control value={props.search} placeholder="Search..." onChange={(event) => {
              props.setSearch(event.target.value)
            }}/>
            </Form>
          </Col>

          {
            props.page === "man" ?
              <Col xs={2}>
                <Button size="lg" variant="light" disabled>
                  <FcBusinessman size={35}></FcBusinessman>
                </Button>
              </Col>
              :
              <Col xs={2}>
                <Button size="lg" variant="light" onClick={(event) => {
                  handleChangeBackardPage()
                  props.setPage("man");
                }}>
                  <FcBusinessman size={30}></FcBusinessman>
                </Button>
              </Col>
          }

          {
            props.page === "woman" ?
              <Col xs={2}>
                <Button size="lg" variant="light" disabled>
                  <FcBusinesswoman size={35}></FcBusinesswoman>
                </Button>
              </Col>
              :
              <Col xs={2}>
                <Button size="lg" variant="light" onClick={(event) => {
                  handleChangeBackardPage()
                  props.setPage("woman");
                }}>
                  <FcBusinesswoman size={30}></FcBusinesswoman>
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
