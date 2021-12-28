
import { Row, Col, Container, Button, Image, Spinner } from "react-bootstrap";
import { useNavigate, NavLink as Link } from "react-router-dom";
import { useState, useEffect } from 'react';



function ChatsPage(props) {

    return <>
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
    </>


}

function SmallChat(props) {

    return <>
        {
        props.messages.length > 0 ?
        <Link to={{ pathname: "/MyChats/" + props.conversation.id_conv }}>
        <Container key={props.idx} style={{ marginTop: 30, paddingBottom: 20, backgroundColor: "#7a6f7356" }}>
            <Row>
                <Col xs={3} sm={3} >
                    <Image roundedCircle src={props.image} style={{ height: 100, width: 100, marginTop: 20 }}></Image>
                </Col>

                <Col>
                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 10 }}>
                        <h5>{props.renter.name}</h5>
                    </Container>

                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 20 }}>
                        <h4>{props.currentAd.title}</h4>
                    </Container>

                    <Container style={{ position: "sticky", textAlign: "center", marginTop: 40 }}>
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

export default ChatsPage;