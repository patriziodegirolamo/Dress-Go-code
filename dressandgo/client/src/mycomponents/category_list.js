import MyCategory from "./category_card.js";
import { Col, Row, Container } from "react-bootstrap";


function MyCategoryList(props) {
 
  return (
    <>
    <Container>
     <Row xs={2} md={2} className="g-4">
     {Array.from({ length: 4 }).map((_, idx) => (
      <Col>

        <MyCategory></MyCategory>


     </Col>
     ))}
     </Row>
     </Container>
    </>
  );
}
export default MyCategoryList;