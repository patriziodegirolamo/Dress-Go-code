import MyCategory from "./category_card.js";
<<<<<<< HEAD
import { Col, Row, Container, Spinner } from "react-bootstrap";
=======
import { Col, Row, Container } from "react-bootstrap";
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d


function MyCategoryList(props) {

  return (
    <>
<<<<<<< HEAD
      {props.dirty ? <Container id="containerSpinner">
        <Spinner animation="border" variant="primary" />
      </Container> : <>
        <Container>
          <Row xs={2} md={2} className="g-4 mb-3">
            {props.categories.sort(function (a, b) {
              if (a.name < b.name) return -1; 
              else if (a.name > b.name) return 1;
              else return 0;
            }).map((cat, idx) => {
              return <Col key={idx}>
                <MyCategory key={idx} handleChangeForwardPage={props.handleChangeForwardPage}
                  categorie={cat} idx={idx}></MyCategory>
              </Col>
            })
            }
          </Row>
        </Container>
      </>
      }
=======
      <Container>
        <Row xs={2} md={2} className="g-4">
          {props.categories.map((cat, idx) => {
            return <Col key={idx}>
              <MyCategory key={idx} handleChangeForwardPage={props.handleChangeForwardPage} 
              categorie={cat} idx={idx}></MyCategory>
            </Col>
          })
          }
        </Row>
      </Container>
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
    </>
  );
}
export default MyCategoryList;