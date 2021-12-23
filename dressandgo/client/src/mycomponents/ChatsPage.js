
import { ChatEngine } from 'react-chat-engine'
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { useNavigate, NavLink as Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getMessages } from '../API';



function ChatsPage(props) {
    return <>
        {
            props.conversations.map((conv, idx) => {

                const currentAd = props.ads.find(ad => ad.id_a == conv.id_a)
                const image = props.adsImages.find(adImage => adImage.id_a == conv.id_a)
                return <SmallChat key={idx} idx={idx} image={image.url} currentAd={currentAd}
                    renter={props.users.find(u => u.id_u == conv.idRenter)} conversation={conv}
                    messages={props.messages.filter(mes => mes.id_conv == conv.id_conv)}>
                </SmallChat>
            })
        }
    </>


}

function SmallChat(props) {
    console.log(props.currentRent)
    /**
    const [messages, setMessages] = useState([]);

    console.log('MESSAGES')

    useEffect(() => {
        async function getMsgs() {
            const fetchedMessages = getMessages(1);
            setMessages(fetchedMessages);
        }
        getMsgs();
    }, []);
     */

    return <Link to={{ pathname: "/MyChats/" + props.conversation.id_conv }}>
        <Container key={props.idx} style={{ marginTop: 30, paddingBottom: 20, backgroundColor: "#7a6f7356" }}>
            <Container style={{ position: "fixed", textAlign: "center", marginLeft: 20, marginTop: 10 }}>
                <h5>{props.renter.name}</h5>
            </Container>

            <Container style={{ position: "fixed", textAlign: "center", marginLeft: 30, marginTop: 50, marginRight: 10 }}>
                <h4>{props.currentAd.title}</h4>
            </Container>
            {props.messages.length > 0 ? 
                <Container style={{ position: "fixed", textAlign: "center", marginLeft: 30, marginTop: 90, marginRight: 10 }}>
                    <p>{props.messages.at(-1).text.substring(0, 30)}...</p>
                </Container>
            
                : <></>}
        
            <Container>
                <Image roundedCircle src={props.image} style={{ height: 100, width: 100, marginTop: 20 }}></Image>
            </Container>
             

        </Container>
    </Link>


}

export default ChatsPage;