
import { ChatEngine } from 'react-chat-engine'
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useNavigate, NavLink as Link, useParams } from "react-router-dom";
import { useState } from 'react';


function ChatMessages(props) {
    let params = useParams();
    const id_conv = parseInt(params.id_conv)

    
    const currentConv = props.conversations.find(c => c.id_conv == id_conv)
    const currentAd = props.ads.find(ad => ad.id_a == currentConv.id_a)
    const messages = props.messages.filter(mes => mes.id_conv == id_conv)
    const renter = props.users.find(u => u.id_u == currentConv.idRenter)
    const image = props.adsImages.find(adImage => adImage.id_a == currentConv.id_a)
    const [newMessage, setNewMessage] = useState("")

    const handleCreateMessage = (event) => {
        event.preventDefault();

        const new_message = {
            id_conv: id_conv,
            idSender: props.user.id_u,
            idReceiver: renter.id_u,
            date: new Date().toISOString(),
            text: newMessage
        };

        props.addAMessage(new_message);
        setNewMessage("")

        document.getElementById("formNewMessage").reset();
    }

    return <Container>
        <Container style={{backgroundColor: "white"}}>
            <Row>
                <Col>
                    <img style={{position: "relative", width: "40%"}}src={image.url}></img>    
                </Col>
                <Col>
                    <h4 style={{textAlign: "center"}}>{renter.name}</h4>    
                    <h5 style={{textAlign: "center"}}>{currentAd.title}</h5> 
                </Col>
            </Row>
            
            
            
        </Container>
        <Container style={{ minHeight: "60vh" }}>
            {messages.map((m, idx) => {
                const yyyymmdd = m.date.split("T")[0];
                const hh1 = m.date.split("T")[1].split(":")[0]
                const hh2 = m.date.split("T")[1].split(":")[1]
                if (props.user.id_u == m.idSender) {
                    //sto inviando il messaggio
                    return <Container className="containerMessage" key={idx} >
                        <img className="messageImageUser righter" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Avatar" />
                        <p className="overflow">{m.text}</p>
                        <span className="time-right">{yyyymmdd} {hh1}:{hh2}</span>
                    </Container>
                }
                else if (props.user.id_u == m.idReceiver) {
                    //sto ricevendo il messaggio
                    return <Container className="containerMessage darker" key={idx}>
                        <img className="messageImageUser" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Avatar"/>
                        <p className="overflow">{m.text}</p>
                        <span className="time-left">{yyyymmdd} {hh1}:{hh2}</span>
                    </Container>
                }
            })}
        </Container>
        <Container style={{position: 'sticky', bottom: 40, backgroundColor: "white",
        padding: 20, marginBottom: 10, marginTop: 20}}>
            <Form id="formNewMessage" onChange={(event) => {
                setNewMessage(event.target.value)
            }}>
                <Row className="justify-content-xs-center">
                    <Col xs={9}>
                        <Form.Control as="textarea" placeholder="type here..." />
                    </Col>
                    <Col xs={3}>
                        <Button type="submit"
                            onClick={handleCreateMessage}>OK</Button>
                    </Col>
                </Row>

            </Form>
        </Container>
    </Container>

}

export default ChatMessages;