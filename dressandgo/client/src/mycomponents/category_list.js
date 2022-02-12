import MyCategory from "./category_card.js";
import { Col, Row, Container, Spinner } from "react-bootstrap";


function MyCategoryList(props) {

  return (
    <>
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
    </>
  );
}
export default MyCategoryList;