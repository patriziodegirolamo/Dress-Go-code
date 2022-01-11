import { Container, Card, Button, Carousel, Modal, Form, Spinner, Row, Col } from "react-bootstrap";
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
                        <Row className="text-center">
                            <h5> {props.ad.title} </h5>
                        </Row>

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

    const [dataIn, setDataIn] = useState(new Date())
    const [dataOut, setDataOut] = useState(new Date())

    const currentAd = props.ads.filter(ad => ad.id_a === idAd)[0];
    const currentImages = props.adsImages.filter(adImg => adImg.id_a === idAd);

    const [showNewMessage, setShowNewMessage] = useState(false);

    const initialMessage = "Hi , I'm contacting you, for the advertisement: ";
    const [newMessage, setNewMessage] = useState(initialMessage)
    const [submitted, setSubmitted] = useState(false)

    const onChange = (dates) => {
        const [start, end] = dates;
        setDataIn(start);
        setDataOut(end);
    };

    const onCloseNewMessageModal = () => {
        setShowNewMessage(false)
        setNewMessage(initialMessage)
    }

    const handleOpenOrCreateConversation = () => {

        const currParam = { "id": idAd, "cat": props.currentCat }
        const conv = props.conversations.find(c => c.id_a == idAd && c.idRenter == props.users.filter(u => u.id_u == currentAd.id_u)[0].id_u && c.idBooker == props.currentUser.id_u)
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

    const handlePressRent = () => {

        setSubmitted(true);
        const newdataIn = new Date(dataIn).toISOString().split("T")[0].replaceAll("-", "/")
        const newdataOut = new Date(dataOut).toISOString().split("T")[0].replaceAll("-", "/")


        const newRent = {
            id_a: parseInt(currentAd.id_a),
            id_renter: props.users.find(u => u.id_u == currentAd.id_u).id_u,
            id_booker: props.currentUser.id_u,
            dataIn: newdataIn,
            dataOut: newdataOut,
            status: "ARRIVING"
        }

        props.addARent(newRent)

        props.setCurrentState("rents");
        localStorage.setItem("currentState", "rents");
        localStorage.setItem("historyStack", JSON.stringify([]))
        localStorage.setItem("currentCat", "")
        props.setCurrentCat("")
        props.setHistoryStack(() => ([]));

        navigate("/MyRents")

    }

    return (<>
        {!currentAd ? <Container id="containerSpinner">
            <Spinner animation="border" variant="danger" />
        </Container>
            : <Card key={idAd}>
                <Card.Title>
                    <Row className="pt-3">
                        <h3 style={{ textAlign: "center" }}>{currentAd.title}</h3>
                    </Row>

                </Card.Title>
                <Container>
                    <Carousel variant="dark">
                        {currentImages.map((img, idx) => {
                            return <Carousel.Item key={idx} style={{ textAlign: "center" }}>
                                <Card.Img variant="top" src={img.url} className="mx-auto m-auto pt-2"
                                    style={{
                                        width: "auto",
                                        maxHeight: "330px"
                                    }} />
                            </Carousel.Item>
                        })}
                    </Carousel>
                </Container>


                <Row className="my-3 justify-content-center" >
                    <Col className="col-4" > <b> BRAND:</b>
                    </Col>
                    <Col className="col-4"> {currentAd.brand}
                    </Col>
                </Row>



                <Row className="my-1 justify-content-center" >
                    <Col className="col-4" > <b> DESCRIPTION:</b>
                    </Col>
                    <Col className="col-4">
                    </Col>

                </Row>
                <Row className="my-1 justify-content-center" >
                    <Col className="col-8">   {currentAd.description}
                    </Col>


                </Row>





                <Row className="my-1 justify-content-center" >
                    <Col className="col-4" > <b> SIZE:</b>
                    </Col>
                    <Col className="col-4"> {currentAd.size}
                    </Col>

                </Row>


                <Row className="my-1 justify-content-center" >
                    <Col className="col-4" > <b> PRICE PER DAY:</b>
                    </Col>
                    <Col className="col-4">  {currentAd.price} €/day
                    </Col>

                </Row>





                <Container>
                    <Row className="justify-content-center mt-3">
                        <Button onClick={() => setShowSizeGuide(true)} className="my-2 btn btn-secondary btn-md w-75" >
                            How to measure your size
                        </Button>

                    </Row>




                    <Row className="justify-content-center">
                        <Button onClick={handleOpenOrCreateConversation} className="my-2 btn btn-secondary btn-md w-75" >
                            Contact the renter
                        </Button>

                    </Row>




                    <Row className="justify-content-center">
                        <Button onClick={() => setShowCalendar(true)} className="mt-5 btn btn-primary btn-md w-75" >
                            Select dates
                        </Button>

                    </Row>















                    {((submitted) && (numDays !== 0)) ? <>
                        <Row className="my-3 justify-content-center" >
                            <Col className="col-4" > <b>End rent:</b>
                            </Col>
                            <Col className="col-4"> 08/08/0808
                            </Col>
                        </Row>

                        <Row className="my-3 justify-content-center" >
                            <Col className="col-4" > <b>End rent:</b>
                            </Col>
                            <Col className="col-4"> 08/08/0808
                            </Col>

                        </Row>

                        <Row className="my-3 justify-content-center" >
                            <Col className="col-4" > <b>OVERALL PRICE:</b>
                            </Col>
                            <Col className="col-4"> {(numDays * currentAd.price).toPrecision(4)}
                            </Col>

                        </Row>
                    </>
                        :
                        <></>

                    }

                    <Row className="justify-content-center">
                        <Button disabled={!submitted} onClick={handlePressRent} className="my-2 btn btn-primary btn-md w-75" >
                            RENT
                        </Button>

                    </Row>

                </Container>

                <Container>
                    <Modal show={showSizeGuide} onClose={() => setShowSizeGuide(false)} onHide={() => setShowSizeGuide(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{currentAd.gender == "man" ? "International men fit guide" : "International ladies fit guide"} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SizeGuide type={currentAd.gender} />
                        </Modal.Body>
                    </Modal>
                </Container>

                <Card.Body>

                    {
                        props.rents ?
                            <MyAvailabilityModal show={showCalendar} setShow={setShowCalendar}
                                dataIn={dataIn} setDataIn={setDataIn} setNumDays={setNumDays}
                                onChange={onChange} dataOut={dataOut} setDataOut={setDataOut}
                                rents={props.rents} currentAd={currentAd} setSubmitted={setSubmitted}>
                            </MyAvailabilityModal>
                            : <></>
                    }

                </Card.Body>

                <Modal show={showNewMessage} onClose={onCloseNewMessageModal}
                    onHide={onCloseNewMessageModal}>

                    <Modal.Header closeButton>
                        <Modal.Title>Contact the renter</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Message:
                        s
                        <Form onChange={(event) => setNewMessage(event.target.value)} className="mt-3">
                            <Form.Control as="textarea" defaultValue={newMessage + currentAd.title + ", "} rows={13} />
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={handleCreateNewConversation}>
                            Send
                        </Button>
                    </Modal.Footer>

                </Modal>

            </Card>
        }
    </>

    );
}



export { MySmallAdvertisement, MyBigAdvertisement };