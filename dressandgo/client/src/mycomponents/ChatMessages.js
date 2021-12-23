
import { ChatEngine } from 'react-chat-engine'
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useNavigate, NavLink as Link, useParams } from "react-router-dom";
import { useState } from 'react';


function ChatMessages(props) {
    let params = useParams();
    
    const messages = props.messages.filter(m => m.id_a == params.id_a && m.id_r == params.id_r)

    const [newMessage, setNewMessage] = useState("")

    console.log(props.messages)
    return <Container>
        <Container style={{minHeight: "73vh" }}>
        {messages.map((m, idx) => {
            if (props.user.id_u == m.idSender) {
                //sto inviando il messaggio
                return <Container key={idx} style={{ backgroundColor: "green" }}>
                    <p>{m.text}</p>
                </Container>
            }
            else if (props.user.id_u == m.idReceiver) {
                //sto ricevendo il messaggio
                return <Container key={idx} style={{ backgroundColor: "red" }}>
                    <p>{m.text}</p>
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