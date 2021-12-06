import { Card, Row, Col } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

function MyCategory(props) {
  return <Link to={{ pathname: "/dresses/" + props.categorie.name }}>
      <Card key={[props.idx]}>
        <Card.Img id={props.idx} variant="top" src={props.categorie.address} className="mx-auto m-auto pt-2" style={{ width: '50%' }} />
        <Card.Body id={props.idx} className='m-auto'>
          <Card.Title id={props.idx}>{props.categorie.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
}
export default MyCategory;
