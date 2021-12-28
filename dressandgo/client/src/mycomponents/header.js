import { Container, Navbar, Form, Row, Col, Button } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";

import { IoWoman, IoMan } from 'react-icons/io5'


function MyHeader(props) {

  
  return (
    <>
      <Navbar >
      {/** TODO: IMPLEMENTARE TASTO BACK UTILIZZANDO LA USELOCATION e capire se serve o meno */}
      {!props.currentCat ?
      <></>
        :
        <Link to={{ pathname: "/previews" }}>
          <Button size="sm" onClick={() => props.handleChangeCurrentCategorie("")}>
            BACK
          </Button>
        </Link>
}
        <Container>
          <Navbar.Brand className='m-auto'>
            <b id="title">Dress&Go</b>
            <sub id="pedice"><i>{props.page}</i></sub>
          </Navbar.Brand>

        </Container>

      </Navbar>
     
    </>
  );
}

export default MyHeader;
