import { Container, Card, Button, Carousel, Modal, Form, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import MyAvailabilityModal from './availabilityModal';
import SizeGuide from "./mySizeGuide";

import "react-datepicker/dist/react-datepicker.css";



function MySmallAdvertisement(props) {
    const navigate = useNavigate();

    const currentImg = props.adsImages.find((el) => el.position === 1);
    return <>

        {
            !currentImg ? <Container id="containerSpinner">
                <Spinner animation="border" variant="danger" />
            </Container> :

                <Card key={props.idx} onClick={() => {
                    navigate("/ad/" + props.ad.id_a)
                    return props.handleChangeForwardPage(props.categories.find((el) => el.id_cat === props.ad.id_cat).name)
                }
                }>
                    <Card.Title>
                        {props.ad.title}
                    </Card.Title>

                    <Card.Img variant="top" src={currentImg.url} className="mx-auto m-auto pt-2" style={{ width: '50%' }} />

                </Card>
        }



    </>
}

function MyBigAdvertisement(props) {
    const navigate = useNavigate();

    let { idAd } = useParams();
    idAd = parseInt(idAd);

    const [numDays, setNumDays] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const currentAd = props.ads.filter(ad => ad.id_a === idAd)[0];
    const currentImages = props.adsImages.filter(adImg => adImg.id_a === idAd);
    const [renter, setRenter] = useState(() => props.users.filter(u => u.id_u == currentAd.id_u)[0])

    const [showNewMessage, setShowNewMessage] = useState(false);

    const initialMessage = "Hi , I'm contacting you, for the advertisement: ";
    const [newMessage, setNewMessage] = useState(initialMessage)

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const onCloseNewMessageModal = () => {
        setShowNewMessage(false)
        setNewMessage(initialMessage)
    }

    const handleOpenOrCreateConversation = () => {

        const currParam = { "id": idAd, "cat": props.currentCat }
        const conv = props.conversations.find(c => c.id_a == idAd && c.idRenter == renter.id_u && c.idBooker == props.currentUser.id_u)
        if (conv) {
            localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
            props.setHistoryStack(() => ([...props.historyStack, "chat"]));
            props.setCurrentCat("");
            props.setCurrentState("chat");
            localStorage.setItem("currParam", JSON.stringify(currParam))
            navigate("/MyChats/" + conv.id_conv)
        }
        else {
            setShowNewMessage(true)
        }

    }

    const handleCreateNewConversation = (event) => {
        event.preventDefault();

        const new_conversation = {
            id_a: currentAd.id_a,
            idRenter: props.users.filter(u => u.id_u == currentAd.id_u)[0].id_u,
            idBooker: props.currentUser.id_u
        };

        const new_message = {
            idSender: props.currentUser.id_u,
            idReceiver: props.users.filter(u => u.id_u == currentAd.id_u)[0].id_u,
            date: new Date().toISOString(),
            text: newMessage
        }

        props.addAConversation(new_conversation, new_message).then(res => {
            const currParam = { "id": idAd, "cat": props.currentCat }
            localStorage.setItem("historyStack", JSON.stringify([...props.historyStack, "chat"]))
            props.setHistoryStack(() => ([...props.historyStack, "chat"]));
            props.setCurrentCat("");
            props.setCurrentState("chat");
            localStorage.setItem("currentState", "chat");
            localStorage.setItem("currParam", JSON.stringify(currParam))

            setShowNewMessage(false);
            navigate("/MyChats/" + res.id_conv)
        })
    }

    return (<>
        {!currentAd ? <Container id="containerSpinner">
            <Spinner animation="border" variant="danger" />
        </Container>
            : <Card key={idAd}>
                <Card.Title>
                    {currentAd.title}
                </Card.Title>
                <Container>
                    <Carousel variant="dark">
                        {currentImages.map((img, idx) => {
                            return <Carousel.Item key={idx}>
                                <Card.Img variant="top" src={img.url} className="mx-auto m-auto pt-2"
                                    style={{ paddingLeft: 30, paddingRight: 50 }} />
                            </Carousel.Item>
                        })}
                    </Carousel>
                </Container>

                <Card.Body>BRAND: {currentAd.brand}</Card.Body>
                <Card.Body>DESCRIPTION: {currentAd.description}</Card.Body>
                <Card.Body>SIZE: {currentAd.size}</Card.Body>

                <Container>
                    <Button onClick={() => setShowSizeGuide(true)}>How to measure your size</Button>
                </Container>

                <Container>
                    <Modal show={showSizeGuide} onClose={() => setShowSizeGuide(false)} onHide={() => setShowSizeGuide(false)}>
                        <Modal.Header>
                            <Button onClick={() => setShowSizeGuide(false)}>X</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <SizeGuide type={currentAd.gender} />
                        </Modal.Body>
                    </Modal>
                </Container>

                <Card.Body>PRICE PER DAY: {currentAd.price} €/day</Card.Body>

                <Card.Body>
                    <Container id="middleButtonContainer">
                        <Button onClick={() => setShowCalendar(true)}>Select dates:</Button>
                    </Container>
                    {
                        props.rents ?
                            <MyAvailabilityModal show={showCalendar} setShow={setShowCalendar}
                                startDate={startDate} setStartDate={setStartDate} setNumDays={setNumDays}
                                onChange={onChange} endDate={endDate} setEndDate={setEndDate}
                                rents={props.rents} currentAd={currentAd}>
                            </MyAvailabilityModal>
                            : <></>
                    }

                </Card.Body>

                {numDays !== 0 ?
                    <Card.Body>OVERALL PRICE: {(numDays * currentAd.price).toPrecision(4)}</Card.Body>
                    : <></>}

                <Container>
                    <Button onClick={handleOpenOrCreateConversation}>SEND A MESSAGE</Button>
                </Container>

                <Container>
                    <Modal show={showNewMessage} onClose={onCloseNewMessageModal}
                        onHide={onCloseNewMessageModal}>
                        <Modal.Header>
                            <Container>
                                <h3>Contact the user</h3>
                            </Container>
                            <Button onClick={onCloseNewMessageModal}>X</Button>
                        </Modal.Header>


                        <Form onChange={(event) => setNewMessage(event.target.value)}>
                            <Form.Control as="textarea" defaultValue={newMessage + currentAd.title + ", "} rows={15} />
                        </Form>

                        <Modal.Footer>
                            <Container>
                                {/**TODO: invia messaggio tramite API */}
                                <Button type="submit" onClick={handleCreateNewConversation}>Send</Button>
                            </Container>
                        </Modal.Footer>
                    </Modal>
                </Container>

                <Container id="middleButtonContainer">
                    <Button>RENT</Button>
                </Container>
            </Card>
        }
    </>

    );
}



export { MySmallAdvertisement, MyBigAdvertisement };