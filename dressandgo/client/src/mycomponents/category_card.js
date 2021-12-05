import { Card, Row, Col} from "react-bootstrap";
import jacket from "./jacket.jpg";

function MyCategory(props) {

  return (
   
        <Card>
          <Card.Img variant="top"  src={jacket} className="mx-auto m-auto pt-2" style={{ width: '50%'}}/>
          <Card.Body className='m-auto'>
            <Card.Title>Jackets</Card.Title>
          </Card.Body>
        </Card>
    
    
);
}
export default MyCategory;
