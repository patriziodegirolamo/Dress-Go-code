import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useNavigate, NavLink as Link, useParams } from "react-router-dom";
import { useState } from 'react';


function CSMessages(props) {
    
    const conv = props.conversationsCS.find(c => c.id_u == props.user.id_u)
    const messages = props.messagesCS.filter(m => m.id_conv == conv.id_conv)
    
    const currentOperator = props.operatorsCS.find(op => conv.id_cs == op.id_cs)
    console.log(messages)
    const [newMessage, setNewMessage] = useState("")

    
    const handleCreateMessage = (event) => {
        event.preventDefault();

        const new_message = {
            id_conv: conv.id_conv,
            idUser: props.user.id_u,
            idCS: currentOperator.id_cs,
            date: new Date().toISOString(),
            text: newMessage,
            isSenderAUser: 1
        };

        props.addAMessageCS(new_message);
        setNewMessage("")

        document.getElementById("formNewMessageCS").reset();
    }
 

    return <>

    <Container>
        
        <Container style={{backgroundColor: "white"}}>
            <Row>
                <Col>
                    <img style={{position: "relative", width: "40%"}}src={"customer-service.png"}></img>    
                </Col>
                
                <Col>
                    <h4 style={{textAlign: "center"}}>OPERATOR #{currentOperator.id_cs}</h4>    
                    <h5 style={{textAlign: "center"}}>{currentOperator.name}</h5> 
                </Col>
                 
            </Row>
            
        </Container>

        
        <Container style={{ minHeight: "60vh" }}>
            {messages.map((m, idx) => {
                const yyyymmdd = m.date.split("T")[0];
                const hh1 = m.date.split("T")[1].split(":")[0]
                const hh2 = m.date.split("T")[1].split(":")[1]
                if (m.isSenderAUser) {
                    //sto inviando il messaggio
                    return <Container className="containerMessage" key={idx} >
                        <img className="messageImageUser righter" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Avatar" />
                        <p className="overflow">{m.text}</p>
                        <span className="time-right">{yyyymmdd} {hh1}:{hh2}</span>
                    </Container>
                }
                else{
                    //sto ricevendo il messaggio
                    return <Container className="containerMessage darker" key={idx}>
                        <img className="messageImageUser" src="customer-service.png" alt="Avatar"/>
                        <p className="overflow">{m.text}</p>
                        <span className="time-left">{yyyymmdd} {hh1}:{hh2}</span>
                    </Container>
                }
            })}
        </Container>
        
        <Container style={{position: 'sticky', bottom: 40, backgroundColor: "white",
        padding: 20, marginBottom: 10, marginTop: 20}}>
            <Form id="formNewMessageCS" onChange={(event) => {
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

</>

}

export default CSMessages;