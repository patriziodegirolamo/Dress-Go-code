import { Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";


function MyHeader(props) {

    return (
     <>
        <Navbar >
        <Container>
          <Navbar.Brand  className='m-auto'> 
          <b id="title">Dress&Go</b> 
          <sub id="pedice"><i>man</i></sub>
          </Navbar.Brand>
        </Container>
      </Navbar>
     
        </>
    );
}

export default MyHeader;
