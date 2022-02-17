import { Card, Col, Image, Container, Row } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Rent(props) {

  const adss = props.ads.find(ad => ad.id_a === props.myrent.id_a);
  let image = null;
  if (adss) {
    image = props.adsImages.find(adImage => adImage.id_a === adss.id_a);
  }

  const onClickHandler = () => {
    props.setCurrentState("rent");
    localStorage.setItem("currentState", "rent");
    localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "rent"]))
    localStorage.setItem("currParam", "{\"id\":" + props.myrent.id_r + "}")
    props.setHistoryStack(() => ([...props.historyStack, "rent"]));

  }

  return <>
    {
      adss ? <Card className="text-center my-2">


        {/*props.myrent.status === "ARRIVING" ? <Card.Header style={{ backgroundColor: "#FCFE8E" }}>{props.myrent.status} </Card.Header> :
          <>
            {
              props.myrent.status === "RETURNING" ? <Card.Header style={{ backgroundColor: "#FCDAB8" }}>{props.myrent.status}  </Card.Header> :
                <>
                  {
                    props.myrent.status === "RETURNED" ? <Card.Header style={{ backgroundColor: "#FCB8B8" }}>{props.myrent.status}  </Card.Header> :
                      <>
                        {
                          props.myrent.status === "ARRIVED" ? <Card.Header style={{ backgroundColor: "#CAFCB8" }}>{props.myrent.status}! <br></br>{props.myrent.dataIn} - {props.myrent.dataOut}  </Card.Header> :

                            <Card.Header style={{ backgroundColor: "#D1DAE5" }}>{props.myrent.status}! <br></br>{props.myrent.dataIn} - {props.myrent.dataOut}
                            </Card.Header>

                        }</>
                  }
                </>
            }
          </>
          */}

        <Card.Body>
          <Container className="headerChat" >
            <Row>
              <Col xs={5}>
                <Image className="my-2" roundedCircle style={{ position: "relative", width: "90%" }} src={image.url}></Image>
                
                   {props.myrent.status === "ARRIVING" ?    <p style={{ backgroundColor: "#FCFE8E" }}> {props.myrent.status} </p>  :
          <>
            {
              props.myrent.status === "RETURNING" ?  <p style={{ backgroundColor: "#FCDAB8" }}> {props.myrent.status} </p> :
                <>
                  {
                    props.myrent.status === "RETURNED" ? <p style={{ backgroundColor: "#FCB8B8" }}> {props.myrent.status} </p>  :
                      <>
                        {
                          props.myrent.status === "ARRIVED" ? <p style={{ backgroundColor: "#CAFCB8" }}> {props.myrent.status} </p>  :

                          <p style={{ backgroundColor: "#D1DAE5" }}> {props.myrent.status} </p>
                           

                        }</>
                  }
                </>
            }
          </>
          }
                
                
                
                
        
              
              
              
              
              
              </Col>
              <Col>
                <h4 className="mt-2" style={{ textAlign: "center" }}>{adss.title}</h4>
                {
                  adss.description.length <= 80 ? 
                    <p>{adss.description}</p>
                    :
                     <p>{adss.description.substring(0, 80)}...</p>
                }
              
              </Col>
            </Row>

{ (props.myrent.status === "CLOSED" || props.myrent.status === "ARRIVED") ?  <Row className="justify-content-center pt-3" style={{ textAlign: "center" }} > <b>Rent dates:</b> {props.myrent.dataIn} - {props.myrent.dataOut}</Row> : <></>


}
          
       

          </Container>
         

          <Link onClick={onClickHandler} to={{ pathname: "/MyRents/" + props.myrent.id_r }} className="my-2 btn btn-primary btn-md w-75" role="button" >
            View details
          </Link>
        </Card.Body>
      </Card>
        : <></>
    }

  </>
}

export { Rent };