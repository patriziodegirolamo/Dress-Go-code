import MyCategory from "./category_card.js";
import { Col, Row, Container } from "react-bootstrap";


function MyCategoryList(props) {

  return (
    <>
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
    </>
  );
}
export default MyCategoryList;