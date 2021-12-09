import { Col, Row, Container, Card } from "react-bootstrap";
import { NavLink as Link, useParams, useNavigate } from "react-router-dom";

function MySmallAdvertisement(props) {
    const navigate = useNavigate();

    return (/*<Link  className='text-link' to={{ pathname: "/ad/" + props.ad.id }}>*/
        <Card key={props.idx} onClick={() => {
            navigate("/ad/" + props.ad.id)
            return props.handleChangeForwardPage(props.ad.cat)}
            }>
            <Card.Title>
                {props.ad.name}
            </Card.Title>
            <Card.Img  variant="top" src={props.ad.address} className="mx-auto m-auto pt-2" 
                style={{ width: '50%' }} />
            
        </Card>
      /*</Link>*/
    );
}

function MyBigAdvertisement(props) {
    let { idAd } = useParams();
    const currentAd = props.ads.filter(ad => ad.id == idAd)[0];

    console.log(currentAd)
    return (<>
        <Card key={idAd}>
            <Card.Title>
                {currentAd.name}
            </Card.Title>
            <Card.Img  variant="top" src={currentAd.address} className="mx-auto m-auto pt-2" 
                style={{ width: '50%' }} />
            <Card.Body>DESCRIPTION: {currentAd.description}</Card.Body>
            <Card.Body>SIZE: {currentAd.size}</Card.Body>
            <Card.Body>PRICE PER DAY: {currentAd.price} €/day</Card.Body>
            
            
        </Card>
      </>
    );
}
export {MySmallAdvertisement, MyBigAdvertisement};