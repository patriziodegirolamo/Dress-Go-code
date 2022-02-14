
import { Row, Col, Container, Button, Form, Image, Spinner } from "react-bootstrap";
import { useNavigate, NavLink as Link, useParams } from "react-router-dom";
import { useState } from 'react';
import { GrSend } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";


function ChatMessages(props) {
    let params = useParams();

    const id_conv = parseInt(params.id_conv)

    const currentConv = props.conversations.find(c => c.id_conv == id_conv);
    let currentAd = null;
    let renter = null;
    let image = null;

    if (currentConv) {
        currentAd = props.ads.find(ad => ad.id_a == currentConv.id_a)
        renter = props.users.find(u => u.id_u == currentConv.idRenter)
        image = props.adsImages.find(adImage => adImage.id_a == currentConv.id_a)
    }
    const messages = props.messages.filter(mes => mes.id_conv == id_conv)

    const [newMessage, setNewMessage] = useState("")

    const handleCreateMessage = (event) => {
        event.preventDefault();

        if (newMessage) {
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
    }

    return <>
        {
            props.dirty ? <Container id="containerSpinner">
                <Spinner animation="border" variant="primary" />
            </Container> : <>{image && currentAd &&
                <Container>

                    <Container className="headerChat" >
                        <Row>
                            <Col xs={4}>
                                <Image className="my-2"roundedCircle style={{ position: "relative", width: "65%", objectFit: "contain" }} src={image.url}></Image>
                                
                            </Col>
                            <Col>
                           
                                <h3 className="mt-2"style={{ textAlign: "center" }}>{currentAd.title}</h3>
                                <p style={{ textAlign: "center" }}> Renter: {renter.name} </p>
                            </Col>
                        </Row>

                    </Container>


                    <div className="message-chat">
                        <div className="chat-body">
                            {
                                messages.map((m, idx) => {
                                    const yyyymmdd = m.date.split("T")[0];
                                    const hh1 = m.date.split("T")[1].split(":")[0]
                                    const hh2 = m.date.split("T")[1].split(":")[1]
                                    if (props.user.id_u == m.idSender) {
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

                                    else if (props.user.id_u == m.idReceiver) {
                                        return <div className="message info" key={idx}>
                                            <img alt="" className="img-circle medium-image" src="customer-service.png" />

                                            <div className="message-body">
                                                <div className="message-info">
                                                    <h4> {renter.name} </h4>
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
                            <Form id="formNewMessage" onChange={(event) => {
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
            }
            </>
        }

    </>

}

export default ChatMessages;