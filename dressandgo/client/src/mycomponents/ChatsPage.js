
import { ChatEngine } from 'react-chat-engine'
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { useNavigate, NavLink as Link } from "react-router-dom";


function ChatsPage(props) {
    return <>
        {
            //ogni r è un noleggio fatto dalla stessa persona e sullo stesso annuncio -> cambiano solo le date
            props.rents.filter(r => r.idBuyer == props.currentUser.id_u).map((r, idx) => {
            const image = props.adsImages.filter(adImage => adImage.id_a == r.id_a)[0]
            return <SmallChat key={idx} idx={idx} image={image.url} currentRent={r} vendor={props.users.find(u => u.id_u == r.idVendor)}
                messages={props.messages.filter(mes => mes.id_a == r.id_a && mes.id_r == r.id_r)}>
            </SmallChat>
        })}
    </>


}

function SmallChat(props) {
    return <Link to={{ pathname: "/MyChats/" + props.currentRent.id_a + "/" + props.currentRent.id_r }}>
        <Container key={props.idx} style={{ marginTop: 30, paddingBottom: 20, backgroundColor: "#7a6f7356" }}>
            <Container style={{ position: "fixed", textAlign: "center", marginLeft: 10, marginTop: 10 }}>
                <h5>{props.vendor.name}</h5>
            </Container>

            {props.messages.length > 0 ?
            <Container style={{ position: "fixed", textAlign: "center", marginLeft: 30, marginTop: 50, marginRight: 10 }}>
                <p>{props.messages.at(-1).text.substring(0, 23)}...</p>
            </Container>
            : <></> }

            <Container style={{ position: "fixed", textAlign: "center", marginTop: 100, marginRight: 20 }}>
                {props.currentRent.dataIn} - {props.currentRent.dataOut}
            </Container>

            <Container>
                <Image roundedCircle src={props.image} style={{ height: 100, width: 100, marginTop: 20 }}></Image>
            </Container>


        </Container>
    </Link>


}

export default ChatsPage;