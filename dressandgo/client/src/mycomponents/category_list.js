import MyCategory from "./category_card.js";
import { Col, Row, Container } from "react-bootstrap";


function MyCategoryList(props) {

  //ATTENZIONE QUANDO FAREMO IL DB ------> MyCategory ----- [0]
  return (
    <>
      <Container>
        <Row xs={2} md={2} className="g-4">
          {props.categories.map((cat, idx) => {
            return <Col key={idx}>
              <MyCategory key={idx} categorie={props.categories.filter(elem => elem.address === cat.address)[0]} idx={idx} ></MyCategory>
            </Col>
          })
          }
        </Row>
      </Container>
    </>
  );
}
export default MyCategoryList;