
import { Row, Col, Container, Image, Spinner } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

function ChatsPage(props) {

    const onClickHandler = (event) => {
        props.setCurrentState("chat");
        localStorage.setItem("currentState", "chat");
        localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
        props.setHistoryStack(() => ([...props.historyStack, "chat"]))
    }

    return <>

        {
            props.dirty || props.contactCS ?
                <Container id="containerSpinner">
                    <Spinner animation="border" variant="primary" />
                </Container> : <>
                <Container>
                <Row className="pt-2">
          <h3 style={{ textAlign: "center" }}>MESSAGES</h3>
        </Row>

                </Container>
               
                    <Container >
                        <Container className="containerChatPreview">
                            <ChatCustomerService conversationsCS={props.conversationsCS}
                                currentUser={props.currentUser} messagesCS={props.messagesCS}
                                setCurrentState={props.setCurrentState}
                                onClickHandler={onClickHandler}
                                historyStack={props.historyStack} setHistoryStack={props.setHistoryStack} />
                        </Container>
                    </Container>


                    {
                        props.conversations.map((conv, idx) => {

                            const currentAd = props.ads.find(ad => ad.id_a === conv.id_a)
                            const image = props.adsImages.find(adImage => adImage.id_a === conv.id_a)
                            return <Container className="containerChatPreview" key={idx}>
                                <SmallChat idx={idx} image={image.url} currentAd={currentAd}
                                    renter={props.users.find(u => u.id_u === conv.idRenter)} conversation={conv}
                                    messages={props.messages.filter(mes => mes.id_conv === conv.id_conv)}
                                    setMessages={props.setMessages} setCurrentState={props.setCurrentState}
                                    onClickHandler={onClickHandler}
                                    historyStack={props.historyStack} setHistoryStack={props.setHistoryStack}>
                                </SmallChat>
                            </Container>
                        })
                    }
                </>}
    </>


}

function SmallChat(props) {


    return <>

        <Link className='text-link' to={{ pathname: "/MyChats/" + props.conversation.id_conv }}
            onClick={props.onClickHandler}>
            <Container key={props.idx}>
                <Row>
                    <Col xs={3} sm={3} >
                        <Image roundedCircle src={props.image} style={{ height: 100, width: 100, marginTop: 20 }}></Image>
                        <Container style={{ textAlign: "center", marginTop: 10 }}>
                            <h6>{props.renter.name}</h6>
                        </Container>
                    </Col>

                    <Col>
                        <Container style={{ position: "sticky", textAlign: "center", marginTop: 10 }}>
                            <h5>{props.currentAd.title.substring(0, 15)}...</h5>
                        </Container>

                        <Container style={{ position: "sticky", textAlign: "center", marginTop: 30 }}>
                            <p>{props.messages[props.messages.length-1].text.substring(0, 40)}...</p>
                        </Container>

                    </Col>

                </Row>

            </Container>
        </Link>


    </>
}

function ChatCustomerService(props) {
    const conv = props.conversationsCS.find(c => c.id_u === props.currentUser.id_u)
    const messages = props.messagesCS.filter(m => m.id_conv === conv.id_conv)

    return <>
    {conv ? 
        <Link className='text-link' to={{ pathname: "/CustomerServiceChat" }}
            onClick={props.onClickHandler}>
            <Container key={props.idx} className="border-top">
                <Row>
                    <Col xs={3} sm={3} >
                        <Image roundedCircle src={"customer-service.png"} style={{ height: 100, width: 100, marginTop: 20 }}></Image>
                        <Container style={{ textAlign: "center", marginTop: 10 }}>
                            <h6>Customer Service</h6>
                        </Container>
                    </Col>

                    {
                        <Col>
                            <Container style={{ position: "sticky", textAlign: "center", marginTop: 80 }}>
                                <p>{messages[messages.length-1].text.substring(0, 40)}...</p>
                            </Container>

                        </Col>
                    }
                </Row>

            </Container>
        </Link>
        :<></>}

    </>
}

export default ChatsPage;