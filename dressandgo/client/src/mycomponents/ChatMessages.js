
import { ChatEngine } from 'react-chat-engine'
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useNavigate, NavLink as Link, useParams } from "react-router-dom";
import { useState } from 'react';


function ChatMessages(props) {
    let params = useParams();

    const currentConv = props.conversations.find(c => c.id_conv == params.id_conv)
    const messages = props.messages.filter(mes => mes.id_conv == params.id_conv)
    const renter = props.users.find(u => u.id_u == currentConv.idRenter)
    const image = props.adsImages.find(adImage => adImage.id_a == currentConv.id_a)
    const [newMessage, setNewMessage] = useState("")

    return <Container>
        <Container>
            <img style={{width: "15%"}}src={image.url}></img>
            <h5>{renter.name}</h5>
        </Container>
        <Container style={{ minHeight: "60vh" }}>
            {messages.map((m, idx) => {
                const yyyymmdd = m.date.split("T")[0];
                const hh1 = m.date.split("T")[1].split(":")[0]
                const hh2 = m.date.split("T")[1].split(":")[1]
                if (props.user.id_u == m.idSender) {
                    //sto inviando il messaggio
                    return <Container className="containerMessage" key={idx} >
                        <img className="messageImageUser" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Avatar" />
                        <p>{m.text}</p>
                        <span className="time-right">{yyyymmdd} {hh1}:{hh2}</span>
                    </Container>
                }
                else if (props.user.id_u == m.idReceiver) {
                    //sto ricevendo il messaggio
                    return <Container className="containerMessage darker" key={idx}>
                        <img className="messageImageUser righter" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Avatar"/>
                        <p>{m.text}</p>
                        <span className="time-left">{yyyymmdd} {hh1}:{hh2}</span>
                    </Container>
                }
            })}
        </Container>
        <Container style={{}}>
            <Form onChange={(event) => {
                setNewMessage(event.target.value)
            }}>
                <Row className="justify-content-xs-center">
                    <Col xs={9}>
                        <Form.Control type="text" placeholder="type here..." />
                    </Col>
                    <Col xs={3}>
                        <Button type="submit"
                            onClick={(event) => {
                                event.preventDefault()
                                //TODO: Invia messaggio
                            }}>OK</Button>
                    </Col>
                </Row>

            </Form>
        </Container>
    </Container>

}

export default ChatMessages;