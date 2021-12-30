
import { Row, Col, Container, Button, Image, Spinner } from "react-bootstrap";
import { useNavigate, NavLink as Link } from "react-router-dom";
import { useState, useEffect } from 'react';



function ChatsPage(props) {

    return <>
        <h2 style={{textAlign: "center"}}>Messages with:</h2>
        
        <Container style={{paddingTop: 10, paddingBottom: 30}}>
            {props.conversationsCS.length > 0 ? <ChatCustomerService conversationsCS={props.conversationsCS} 
            currentUser={props.currentUser} messagesCS={props.messagesCS}/>
            : <Spinner/>}
        </Container>

        <Container id="contprova" style={{}}>
        {
            props.conversations.map((conv, idx) => {

                const currentAd = props.ads.find(ad => ad.id_a == conv.id_a)
                const image = props.adsImages.find(adImage => adImage.id_a == conv.id_a)
                return <SmallChat key={idx} idx={idx} image={image.url} currentAd={currentAd}
                    renter={props.users.find(u => u.id_u == conv.idRenter)} conversation={conv}
                    messages={props.messages.filter(mes => mes.id_conv == conv.id_conv)}
                    setMessages={props.setMessages}>
                </SmallChat>
                })
        }
        </Container>
    </>


}

function SmallChat(props) {

    return <>
        {
        props.messages.length > 0 ?
        <Link className='text-link' to={{ pathname: "/MyChats/" + props.conversation.id_conv }}>
        <Container key={props.idx} style={{ marginTop: 10, paddingBottom: 20, backgroundColor: "#7a6f7356" }}>
            <Row>
                <Col xs={3} sm={3} >
                    <Image roundedCircle src={props.image} style={{ height: 100, width: 100, marginTop: 20 }}></Image>
                </Col>

                <Col>
                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 10 }}>
                        <h5>{props.renter.name}</h5>
                    </Container>

                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 10 }}>
                        <p>{props.currentAd.title}</p>
                    </Container>

                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 10 }}>
                        <p>{props.messages.at(-1).text.substring(0, 30)}...</p>
                    </Container>

                </Col>

            </Row>

        </Container>
    </Link>
 : <Spinner></Spinner>
        }
    </>
}

function ChatCustomerService(props){
    const conv = props.conversationsCS.find(c => c.id_u == props.currentUser.id_u)
    const messages = props.messagesCS.filter(m => m.id_conv == conv.id_conv)
    return <>
    {props.conversationsCS.length > 0 ? <Link className='text-link' to={{ pathname: "/CustomerServiceChat"}}>
        <Container key={props.idx} style={{ marginTop: 10, paddingBottom: 20, backgroundColor: "#7a6f7356" }}>
            <Row>
                <Col xs={3} sm={3} >
                    <Image roundedCircle src={"customer-service.png"} style={{ height: 100, width: 100, marginTop: 20 }}></Image>
                </Col>

                {
                <Col>
                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 10 }}>
                        <h4>Customer Service</h4>
                        <h5>{conv.name_cs}</h5>
                    </Container>

                    {messages.length > 0 ? 
                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 10 }}>
                        <p>{messages.at(-1).text.substring(0, 30)}...</p>
                    </Container>
                    :<></>
                    }
                </Col>
                }
            </Row>

        </Container>
    </Link>:<></>}
    
    </>
}

export default ChatsPage;