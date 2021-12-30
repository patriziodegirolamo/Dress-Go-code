import { Container, Card, Carousel, Row, Modal, Button, Form } from "react-bootstrap";
import { useParams, } from "react-router-dom";
import { NavLink as Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

function OrderSummary(props) {

  let navigate = useNavigate();
  let { id_r } = useParams();
  id_r = parseInt(id_r);

  const currentRent = props.rents.find(r => r.id_r === id_r);
  const ads = props.ads.find(ad => ad.id_a === currentRent.id_a);
  const currentImages = props.adsImages.filter(adImg => adImg.id_a === currentRent.id_a);


  const [showNewMessage, setShowNewMessage] = useState(false);

  const initialMessage = "Hi , I'm contacting you, for the advertisement: ";
  const [newMessage, setNewMessage] = useState(initialMessage)

  const onCloseNewMessageModal = () => {
    setShowNewMessage(false)
    setNewMessage(initialMessage)
  }


  const handleOpenOrCreateConversation = () => {
    const currParam = { "id": id_r }
    const conv = props.conversations.find(c => {
      const cr = props.rents.find(r => r.id_r === id_r);
      if (c.id_a == cr.id_a && c.idRenter == cr.idRenter && c.idBooker == cr.idBooker)
        return c;
    })
    if (conv) {
      localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
      props.setHistoryStack(() => ([...props.historyStack, "chat"]));
      props.setCurrentState("chat");
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
      //TODO
      localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
      navigate("/MyChats/" + res.id_conv)
    })
  }

  const onClickHandler = () => {
    props.setCurrentState("chat");
    localStorage.setItem("currentState", "chat");
    localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
    props.setHistoryStack(() => ([...props.historyStack, "chat"]));
  }

  return <>

    {
      ads ? <>
        <Container fluid>
          <Row className="justify-content-center">
            {ads.title}
          </Row>

          <Container>
            <Carousel variant="dark">
              {currentImages.map((img, idx) => {
                return <Carousel.Item key={idx}>
                  <Card.Img variant="top" src={img.url} className="mx-auto m-auto pt-2"
                    style={{ paddingLeft: 30, paddingRight: 50 }} />
                </Carousel.Item>
              })}
            </Carousel>
          </Container>

          <Row className="pt-3 justify-content-center">BRAND: {ads.brand}</Row>
          <Row className="justify-content-center">DESCRIPTION: {ads.description}</Row>
          <Row className="justify-content-center">SIZE: {ads.size} </Row>
          <Row className="justify-content-center">PRICE: €{ads.price}/D </Row>


          <Row className="pt-3 justify-content-center">START RENT: {currentRent.dataIn}</Row>
          <Row className="justify-content-center">END RENT: {currentRent.dataOut}</Row>
          <Row className="justify-content-center">SHIPPING COST: €9 </Row>

          <Row className="pt-3 justify-content-center">TOTAL: €{currentRent.total}</Row>

          <Container fluid>



            <Row className="justify-content-center">
              <Container>
                <Button onClick={handleOpenOrCreateConversation}>SEND A MESSAGE</Button>
              </Container>

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
                      {/**TODO: invia messaggio tramite API */}
                      <Button type="submit" onClick={handleCreateNewConversation}>Send</Button>
                    </Container>
                  </Modal.Footer>
                </Modal>
              </Container>

              <Link onClick={onClickHandler} className="btn btn-primary btn-md w-75 justify-content-center" role="button" to="/CustomerServiceChat"  >
                Contact customer service
              </Link>

              <Link className="my-2 btn btn-primary btn-md w-75 disabled" role="button" to=""  >
                Return product
              </Link>

            </Row>
          </Container>
        </Container>
      </>

        : <> </>
    }


  </>
}

export default OrderSummary;