import { Col, Row, Container, Card } from "react-bootstrap";
import { NavLink as Link, useParams  } from "react-router-dom";

function MySmallAdvertisement(props) {

    return (<Link to={{ pathname: "/ad/" + props.ad.id }}>>
        <Card key={props.idx}>
            <Card.Title>
                {props.ad.name}
            </Card.Title>
            <Card.Img  variant="top" src={props.ad.address} className="mx-auto m-auto pt-2" 
                style={{ width: '50%' }} />
            
        </Card>
      </Link>
    );
}

function MyBigAdvertisement(props) {
    let { idAd } = useParams();
    return (<>
        <Card >
            <Card.Title>
                {idAd}
                {"prova" /**props.ad.name*/}
            </Card.Title>
            
        </Card>
      </>
    );
}
export {MySmallAdvertisement, MyBigAdvertisement};