import { Card } from "react-bootstrap";
import { NavLink as Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Rent(props) {

  const params = useParams();
  const adss = props.ads.find(ad => ad.id_a === props.myrent.id_a);

  const onClickHandler = () => {
    props.setCurrentState("rent");
    localStorage.setItem("currentState", "rent");
    localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "rent"]))
    localStorage.setItem("currParam", "{\"id\":" + props.myrent.id_r +"}")
    props.setHistoryStack(() => ([...props.historyStack, "rent"]));

  }

  return <>
    {
      adss ? <Card className="text-center my-4">
        <Card.Header>{props.myrent.status}</Card.Header>
        <Card.Body>
          <Card.Title>{adss.title}</Card.Title>
          <Card.Text>
            {adss.description}
          </Card.Text>

          <Link onClick={onClickHandler} to={{ pathname: "/MyRents/" + props.myrent.id_r }} className="my-2 btn btn-primary btn-md w-75" role="button" >
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