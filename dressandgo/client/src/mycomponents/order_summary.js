import { Container, Card, Carousel, Row, Modal, Button, Form, Col, Overlay } from "react-bootstrap";
import { NavLink as Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef } from 'react';

function OrderSummary(props) {

  let navigate = useNavigate();
  let { id_r } = useParams();
  id_r = parseInt(id_r);

  const currentRent = props.rents.find(r => r.id_r === id_r);
  const ads = props.ads.find(ad => ad.id_a === currentRent.id_a);
  const currentImages = props.adsImages.filter(adImg => adImg.id_a === currentRent.id_a);


  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showReturnLabel, setShowReturnLabel] = useState(false);

  const initialMessage = "Hi , I'm contacting you, for the advertisement: ";
  const [newMessage, setNewMessage] = useState(initialMessage);
  const [show, setShow] = useState(false);
  const target = useRef(null);


  const onCloseNewMessageModal = () => {
    setShowNewMessage(false)
    setNewMessage(initialMessage)
  }


  const handleOpenOrCreateConversation = () => {
    const currParam = { "id": id_r }
    const conv = props.conversations.find(c => {
      const cr = props.rents.find(r => r.id_r === id_r);
      if (c.id_a === cr.id_a && c.idRenter === cr.idRenter && c.idBooker === cr.idBooker)
        return c;
    })
    if (conv) {
      localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
      props.setHistoryStack(() => ([...props.historyStack, "chat"]));
      props.setCurrentState("chat");
      localStorage.setItem("currentState", "chat");
      localStorage.setItem("currParam", JSON.stringify(currParam))
      navigate("/MyChats/" + conv.id_conv)
    }
    else {
      setShowNewMessage(true)
    }

  }

  const handleCreateNewConversation = (event) => {
    event.preventDefault();
    const cr = props.rents.find(r => r.id_r === id_r);
    const currParam = { "id": id_r }
    const new_conversation = {
      id_a: cr.id_a,
      idRenter: cr.idRenter,
      idBooker: cr.idBooker
    };

    const new_message = {
      idSender: cr.idBooker,
      idReceiver: cr.idRenter,
      date: new Date().toISOString(),
      text: newMessage
    }

    props.addAConversation(new_conversation, new_message).then(res => {
      setShowNewMessage(false);
      localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
      props.setHistoryStack(() => ([...props.historyStack, "chat"]));
      props.setCurrentState("chat");
      localStorage.setItem("currentState", "chat");
      localStorage.setItem("currParam", JSON.stringify(currParam))
      navigate("/MyChats/" + res.id_conv)
    })
  }

  const onClickHandler = () => {
    props.setCurrentState("chat");
    localStorage.setItem("currentState", "chat");
    localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
    props.setHistoryStack(() => ([...props.historyStack, "chat"]));

    if (currentRent.status === "ARRIVED" || currentRent.status === "RETURNING")
      props.unlockReturnProcedure({ id_r: currentRent.id_r });

  }

  const countDays = (dataIn, dataOut) => {
    if (dataOut === dataIn)
      return dataIn;
    else
      return 1 + (new Date(dataOut).getTime() - new Date(dataIn).getTime()) / (1000 * 3600 * 24)
  }

  const shippingCost = 9.99;


  const handleReturnProcedure = () => {
    const newStatus = { id_r: currentRent.id_r, status: "RETURNING" }
    props.modifyStatusR(newStatus);
    setShowReturnLabel(true);
  }

  return <>

    {
      ads ? <>
        <Container fluid>

          <Row className="pt-3">
            <h3 id="titlecard" style={{ textAlign: "center" }}><b> {ads.title}</b></h3>
          </Row>

          <Container>
            <Carousel variant="dark">
              {currentImages.map((img, idx) => {
                return <Carousel.Item key={idx} style={{ textAlign: "center" }}>
                  <Card.Img variant="top" src={img.url} className="mx-auto m-auto pt-2"
                    style={{
                      width: "auto",
                      maxHeight: "330px"
                    }} />
                </Carousel.Item>
              })}
            </Carousel>
          </Container>


          <Row className="justify-content-center pt-3 text-center">

            <b>BRAND:</b> {ads.brand}

          </Row>
          <Container>
            <Row className="justify-content-center mx-1 text-center">
              <b>DESCRIPTION:</b> {ads.description}

            </Row>
          </Container>

          <Row className="justify-content-center  text-center">

            <b>SIZE:</b> {ads.size}

          </Row>
          <Row className="justify-content-center  text-center pt-2 pb-5 border-bottom">
            <b>PRICE PER DAY:</b> {ads.price} €/day

          </Row>

          <h4 className="pt-3 justify-content-center text-center">Summary of your rent:</h4>
          <Row className="pt-3 justify-content-center text-center">START RENT: {currentRent.dataIn}</Row>
          <Row className="justify-content-center text-center">END RENT: {currentRent.dataOut} </Row>
          <Row className="justify-content-center text-center">SHIPPING COST: {shippingCost} €.  </Row>

          {(currentRent.status === "CLOSED") ? <> </> :

            <Row className="justify-content-center text-center"> <i> The overall price includes the 5% deposit. </i> </Row>

          }


          <Row className="pt-3 justify-content-center text-center border-bottom pb-3"><b>TOTAL: {

            (currentRent.status === "CLOSED") ? ((shippingCost + countDays(currentRent.dataIn, currentRent.dataOut) * ads.price).toPrecision(4))

              :
              ((shippingCost + countDays(currentRent.dataIn, currentRent.dataOut) * ads.price + (countDays(currentRent.dataIn, currentRent.dataOut) * ads.price * 0.05)).toPrecision(4))

          }
            €.</b></Row>


          <Container fluid>



            <Row className="justify-content-center pt-3">


              <Container>
                <Modal show={showNewMessage} onClose={onCloseNewMessageModal}
                  onHide={onCloseNewMessageModal}>
                  <Modal.Header>
                    <Container>
                      <h3>Contact the user</h3>
                    </Container>
                    <Button onClick={onCloseNewMessageModal}>X</Button>
                  </Modal.Header>


                  <Form onChange={(event) => setNewMessage(event.target.value)}>
                    <Form.Control as="textarea" defaultValue={newMessage + ", "} rows={15} />
                  </Form>

                  <Modal.Footer>
                    <Container>
                      <Button type="submit" onClick={handleCreateNewConversation}>Send</Button>
                    </Container>
                  </Modal.Footer>
                </Modal>
              </Container>
              <Link onClick={handleOpenOrCreateConversation} className="mt-2 btn btn-secondary btn-md w-75 justify-content-center" role="button" to="/CustomerServiceChat"  >
                Contact the renter
              </Link>

              <Link onClick={onClickHandler} className="my-2 btn btn-secondary btn-md w-75 justify-content-center" role="button" to="/CustomerServiceChat"  >
                Contact customer service
              </Link>

              <Container>
                <Overlay target={target.current} show={show} placement="top">
                  {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                      {...props}
                      style={{

                        backgroundColor: 'rgb(189, 195, 199)',
                        padding: '2px 10px 2px',
                        color: 'white',
                        borderRadius: 3,
                        ...props.style,
                      }}
                    >
                      If you have some problems with the order <br></br> you can contact the renter or the customer service <br></br>
                      to unlock the return procedure in advance!
                    </div>
                  )}
                </Overlay>
              </Container>

              <Container>
                <Modal show={showReturnLabel} onClose={() => setShowReturnLabel(false)} onHide={() => setShowReturnLabel(false)}>
                  <Modal.Header>
                    <Modal.Title>
                      <Row>
                        <b>Return procedure</b>
                      </Row>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You are requesting for the return procedure.
                    You can print the label below and use it to send your products back.
                    When the product arrives to destination you will receive your refund.

                    <img alt='noimage' className='small' src='/label.png' width="100%" />
                  </Modal.Body>
                  <Modal.Footer>
                    <Col md={8}>
                      <Button variant="secondary" onClick={() => setShowReturnLabel(false)}>
                        Close
                      </Button>
                    </Col>
                  </Modal.Footer>
                </Modal>
              </Container>


              <Row>
                <Col xs={2} />
                <Col xs={1}>
                  <Link className="" ref={target} onClick={() => setShow(!show)} role="button" to="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </Link>
                </Col>

                <Col xs={9} className="px-md-5">
                  {currentRent.return === "UNLOCKED" && (currentRent.status === "ARRIVED" || currentRent.status === "RETURNING") ?
                    <Button className="my-2 mt-3 btn btn-primary btn-md w-75" role="button" to="" onClick={handleReturnProcedure} >
                      Return product
                    </Button>
                    :
                    <Button className="my-2 mt-3 btn btn-primary btn-md w-75 disabled" role="button" to="">
                      Return product
                    </Button>
                  }

                </Col>
              </Row>
            </Row>
          </Container>
        </Container>
      </>

        : <> </>
    }


  </>
}

export default OrderSummary;