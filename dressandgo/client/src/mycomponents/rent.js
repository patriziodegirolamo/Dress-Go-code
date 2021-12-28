import { Card } from "react-bootstrap";
import { NavLink as Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Rent(props) {

  let navigate = useNavigate();
  const adss = props.ads.find(ad => ad.id_a === props.myrent.id_a);
  



  

  return <>
    {
      adss ? <Card className="text-center my-4">
        <Card.Header>{props.myrent.status}</Card.Header>
        <Card.Body>
          <Card.Title>{adss.title}</Card.Title>
          <Card.Text>
            {adss.description}
          </Card.Text>

          <Link to={{ pathname: "/MyRents/" + props.myrent.id_r }} className="my-2 btn btn-primary btn-md w-75" role="button" >
            View details
          </Link>
        </Card.Body>
        <Card.Footer className="text-muted">{props.myrent.dataIn} - {props.myrent.dataOut}</Card.Footer>
      </Card>
        : <></>
    }

  </>
}

export { Rent };