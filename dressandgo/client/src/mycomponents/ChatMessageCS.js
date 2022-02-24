import { Row, Col, Container, Button, Form, Spinner } from "react-bootstrap";
import { useState } from 'react';
import { IoMdSend } from "react-icons/io";


function CSMessages(props) {

    const conv = props.conversationsCS.find(c => c.id_u === props.user.id_u)
    const messages = props.messagesCS.filter(m => m.id_conv === conv.id_conv)

    const currentOperator = props.operatorsCS.find(op => conv.id_cs === op.id_cs)
    const [newMessage, setNewMessage] = useState("")


    const handleCreateMessage = (event) => {
        event.preventDefault();

        if (newMessage) {

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
    }


    return <>

        {
            props.dirty ? <Container id="containerSpinner">
                <Spinner animation="border" variant="primary" />
            </Container> : <>
            <Container>
                <Container className="headerChat pb-3">
                    <Row >
                        <Col>
                            <img alt="Customer Service profile"style={{ position: "relative", width: "40%" }} src={"customer-service.png"}></img>
                        </Col>

                        <Col>
                            <h4 style={{ textAlign: "center" }}>OPERATOR #{currentOperator.id_cs}</h4>
                            <h5 style={{ textAlign: "center" }}>{currentOperator.name}</h5>
                        </Col>

                    </Row>

                </Container>

                <div className="message-chat">
                    <div className="chat-bodycs">
                        {
                            messages.map((m, idx) => {
                                const yyyymmdd = m.date.split("T")[0];
                                const hh1 = m.date.split("T")[1].split(":")[0]
                                const hh2 = m.date.split("T")[1].split(":")[1]
                                if (m.isSenderAUser) {
                                    return <div className="message my-message" key={idx}>
                                        <img alt="" className="img-circle medium-image" src="/boss.png" />

                                        <div className="message-body">
                                            <div className="message-body-inner">
                                                <div className="message-info">
                                                    <h4> You </h4>
                                                    <h5> <i className="fa fa-clock-o"></i>{yyyymmdd} {hh1}:{hh2} </h5>
                                                </div>
                                                <hr />
                                                <div className="message-text">
                                                    {m.text}
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                }

                                else {
                                    return <div className="message info" key={idx}>
                                        <img alt="" className="img-circle medium-image" src="customer-service.png" />

                                        <div className="message-body">
                                            <div className="message-info">
                                                <h4> {currentOperator.name} </h4>
                                                <h5> <i className="fa fa-clock-o"></i>{yyyymmdd} {hh1}:{hh2} </h5>
                                            </div>
                                            <hr />
                                            <div className="message-text">
                                                {m.text}
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                }
                            })
                        }
                    </div>


                    <div className="chat-footer new-message-textarea">
                        <Form id="formNewMessageCS" onChange={(event) => {
                            setNewMessage(event.target.value)
                        }}>
                            <Row className="justify-content-xs-center">
                                <Col xs={10}>
                                    <Form.Control as="textarea" placeholder="Type here..." />
                                </Col>

                                <Col xs={2} >
                                    <Button size="lg" type="submit" className="send-message-button" onClick={handleCreateMessage}>

                                        <IoMdSend />

                                    </Button>
                                </Col>

                            </Row>
                        </Form>
                    </div>

                </div>
               </Container>
            </>}
    </>

}

export default CSMessages;