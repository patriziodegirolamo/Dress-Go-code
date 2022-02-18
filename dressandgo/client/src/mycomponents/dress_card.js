import '../css/dress_card.css';
import { Container, Card, Button, Carousel, Modal, Form, Spinner, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import MyAvailabilityModal from './availabilityModal';
import SizeGuide from "./mySizeGuide";

import "react-datepicker/dist/react-datepicker.css";

<style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@1,600&display=swap');
</style>

function MySmallAdvertisement(props) {
    const navigate = useNavigate();

    const currentImg = props.adsImages.find((el) => el.position === 1);
    return <>
<<<<<<< HEAD
        <Card key={props.idx} onClick={() => {
            navigate("/ad/" + props.ad.id_a)
            return props.handleChangeForwardPage(props.categories.find((el) => el.id_cat === props.ad.id_cat).name)
        }
        }>
            <Card.Img variant="top" src={currentImg.url} className="mx-auto" style={{ width: '100%' }} />

            <Card.Body>

                <Row>
                    {
                        props.ad.title.length <= 10 ?
                            <h5 id="titlead" > {props.ad.title}</h5>
                            :
                            <h5 id="titlead" > {props.ad.title.substring(0, 10)}...</h5>
                    }

                </Row>

                <Row className="justify-content-center" >
                    <Col> IT SIZE:
                    </Col>
                    <Col >


                        {props.ad.size.length > 4 ?
                            <>

                                {props.ad.size.substring(0, 4)}...

                            </>

                            :

                            <>
                                {props.ad.size}
                            </>


                        }


                    </Col>

                </Row>


                <Row className="justify-content-center" >
                    <Col > <b> PRICE:</b>
                    </Col>
                    <Col > <b>{props.ad.price}€/d</b>
                    </Col>

                </Row>

            </Card.Body>

        </Card>
=======

        {
            !currentImg ? <Container id="containerSpinner">
                <Spinner animation="border" variant="danger" />
            </Container> :

                <Card key={props.idx} onClick={() => {
                    navigate("/ad/" + props.ad.id_a)
                    return props.handleChangeForwardPage(props.categories.find((el) => el.id_cat === props.ad.id_cat).name)
                }
                }>

                    <Card.Img variant="top" src={currentImg.url} className="mx-auto" style={{ width: '100%' }} />

                    <Card.Body>

                        <Row>
                            <h5 id="titlead" > {props.ad.title}</h5>
                        </Row>

                        <Row className="justify-content-center" >
                            <Col>SIZE:
                            </Col>
                            <Col > {props.ad.size}
                            </Col>

                        </Row>


                        <Row className="justify-content-center" >
                            <Col > <b> PRICE:</b>
                            </Col>
                            <Col > <b>{props.ad.price}€/d</b>
                            </Col>

                        </Row>

                    </Card.Body>
                </Card>
        }
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d

    </>
}

function MyBigAdvertisement(props) {
    const navigate = useNavigate();

    let { idAd } = useParams();
    idAd = parseInt(idAd);

    const [numDays, setNumDays] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
<<<<<<< HEAD
    const [showRecap, setShowRecap] = useState(false);
=======
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d

    const [dataIn, setDataIn] = useState(new Date())
    const [dataOut, setDataOut] = useState(new Date())

    const currentAd = props.ads.filter(ad => ad.id_a === idAd)[0];
    const currentImages = props.adsImages.filter(adImg => adImg.id_a === idAd);

    const [showNewMessage, setShowNewMessage] = useState(false);

    const initialMessage = "Hi , I'm contacting you, for the advertisement: ";
    const [newMessage, setNewMessage] = useState(initialMessage)
    const [submitted, setSubmitted] = useState(false)
<<<<<<< HEAD
    const [clearclick, setClearclick] = useState(false)


    let newdataIn;
    let newdataOut;
=======
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d

    const onChange = (dates) => {
        const [start, end] = dates;
        setDataIn(start);
        setDataOut(end);
<<<<<<< HEAD
        setClearclick(true);

=======
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
    };

    const onCloseNewMessageModal = () => {
        setShowNewMessage(false)
        setNewMessage(initialMessage)
    }

    const handleOpenOrCreateConversation = () => {

        const currParam = { "id": idAd, "cat": props.currentCat }
<<<<<<< HEAD
        const conv = props.conversations.find(c => c.id_a === idAd && c.idRenter === props.users.filter(u => u.id_u === currentAd.id_u)[0].id_u && c.idBooker === props.currentUser.id_u)
=======
        const conv = props.conversations.find(c => c.id_a == idAd && c.idRenter == props.users.filter(u => u.id_u == currentAd.id_u)[0].id_u && c.idBooker == props.currentUser.id_u)
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
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
<<<<<<< HEAD
            idRenter: props.users.filter(u => u.id_u === currentAd.id_u)[0].id_u,
=======
            idRenter: props.users.filter(u => u.id_u == currentAd.id_u)[0].id_u,
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
            idBooker: props.currentUser.id_u
        };

        const new_message = {
            idSender: props.currentUser.id_u,
<<<<<<< HEAD
            idReceiver: props.users.filter(u => u.id_u === currentAd.id_u)[0].id_u,
=======
            idReceiver: props.users.filter(u => u.id_u == currentAd.id_u)[0].id_u,
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
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
<<<<<<< HEAD
        setShowRecap(false);

        setSubmitted(true);
        newdataIn = new Date(dataIn).toISOString().split("T")[0].replaceAll("-", "/")
        newdataOut = new Date(dataOut).toISOString().split("T")[0].replaceAll("-", "/")

        const newRent = {
            id_a: parseInt(currentAd.id_a),
            id_renter: props.users.find(u => u.id_u === currentAd.id_u).id_u,
=======

        setSubmitted(true);
        const newdataIn = new Date(dataIn).toISOString().split("T")[0].replaceAll("-", "/")
        const newdataOut = new Date(dataOut).toISOString().split("T")[0].replaceAll("-", "/")


        const newRent = {
            id_a: parseInt(currentAd.id_a),
            id_renter: props.users.find(u => u.id_u == currentAd.id_u).id_u,
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
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

<<<<<<< HEAD

        navigate("/MyRents")
    }

    return (<>
        {props.dirty ? <Container id="containerSpinner">
            <Spinner animation="border" variant="primary" />
        </Container>
            : <Card key={idAd} style={{
                maxWidth: "100%",
                overflowX: "hidden"
            }}>
                <Card.Title>
                    <Row className="pt-3">
                        <h3 id="titlecard" style={{ textAlign: "center" }}><b>{currentAd.title}</b></h3>
=======
        navigate("/MyRents")

    }

    return (<>
        {!currentAd ? <Container id="containerSpinner">
            <Spinner animation="border" variant="danger" />
        </Container>
            : <Card key={idAd}>
                <Card.Title>
                    <Row className="pt-3">
                        <h3 id="titlecard"style={{ textAlign: "center"}}>{currentAd.title}</h3>
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
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

<<<<<<< HEAD
                <Row className="justify-content-center pt-3 text-center">

                    Rented by: <i>{props.users.filter(x => x.id_u === currentAd.id_u)[0].name} (Private)</i>
=======

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

>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d

                </Row>


<<<<<<< HEAD
                <Row className="justify-content-center pt-3 text-center">

                    <b>BRAND:</b> {currentAd.brand}

                </Row>

                <Container>
                    <Row className="justify-content-center mx-1 text-center">
                        <b>DESCRIPTION:</b> {currentAd.description}

                    </Row>
                </Container>

                <Row className="justify-content-center  text-center">

                    <b>SIZE:</b> {currentAd.size}

                </Row>
                <Row className="justify-content-center  text-center pt-2 pb-2">
                    <b>PRICE PER DAY:</b> {currentAd.price} €/day

                </Row>

                <Container>

                    {(currentAd.id_cat === 7 || currentAd.id_cat === 11 | currentAd.id_cat === 12 || currentAd.id_cat === 16 || currentAd.id_cat === 10 || currentAd.id_cat === 6) ? <></> :


                        <Row className="justify-content-center">
                            <Button onClick={() => setShowSizeGuide(true)} className="my-2 btn btn-secondary btn-md w-75" >
                                How to measure your size
                            </Button>

                        </Row>




                    }


=======



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
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d




                    <Row className="justify-content-center">
                        <Button onClick={handleOpenOrCreateConversation} className="my-2 btn btn-secondary btn-md w-75" >
                            Contact the renter
                        </Button>

                    </Row>

<<<<<<< HEAD
                    {numDays === 0 ?

                        <Container className="text-center">

                            <Row>  <h5 className='mt-5 '>
                                Select the dates before proceed
                            </h5> </Row>
                        </Container>

                        :
                        <></>
                    }
=======
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d



                    <Row className="justify-content-center">
<<<<<<< HEAD
                        <Button onClick={() => setShowCalendar(true)} className="mt-2 btn btn-primary btn-md w-75" >
=======
                        <Button onClick={() => setShowCalendar(true)} className="mt-5 btn btn-primary btn-md w-75" >
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
                            Select dates
                        </Button>

                    </Row>

<<<<<<< HEAD
                    {numDays !== 0 ?

                        <Container className="text-center">

                            <Row>  <h5 className='mt-3 '>
                                Dates selected. <br></br> You can proceed with the rental!
                            </h5> </Row>
                        </Container>

                        :
                        <></>
                    }


                    <Row className="justify-content-center">
                        <Button disabled={!submitted} onClick={() => setShowRecap(true)} className="my-2 btn btn-primary btn-md w-75" >
=======














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
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
                            RENT
                        </Button>

                    </Row>

                </Container>

                <Container>
                    <Modal show={showSizeGuide} onClose={() => setShowSizeGuide(false)} onHide={() => setShowSizeGuide(false)}>
<<<<<<< HEAD
                        <Modal.Header>
                            <Modal.Title>
                                {currentAd.gender === "man" ? <>INTERNATIONAL MENS FIT GUIDE</> : <>INTERNATIONAL LADIES FIT GUIDE</>}

                            </Modal.Title>

=======
                        <Modal.Header closeButton>
                            <Modal.Title>{currentAd.gender == "man" ? "International men fit guide" : "International ladies fit guide"} </Modal.Title>
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
                        </Modal.Header>
                        <Modal.Body>
                            <SizeGuide type={currentAd.gender} />
                        </Modal.Body>
<<<<<<< HEAD
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowSizeGuide(false)}>
                                Close
                            </Button>


                        </Modal.Footer>
                    </Modal>
                </Container>

                <Container>
                    <Modal show={showRecap} onClose={() => setShowRecap(false)} onHide={() => setShowRecap(false)}>
                        <Modal.Header>
                            <Modal.Title>
                                <Row className="justify-content-center pt-3 text-center">
                                    <b> YOU ARE ORDERING: </b>  {currentAd.title}
                                </Row>

                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className="justify-content-center pt-3 text-center">
                                    <b>BRAND:</b> {currentAd.brand}
                                </Row>

                                <Container>
                                    <Row className="justify-content-center mx-1 text-center">
                                        <b>DESCRIPTION:</b> {currentAd.description}

                                    </Row>
                                </Container>

                                <Row className="justify-content-center  text-center">

                                    <b>SIZE:</b> {currentAd.size}

                                </Row>
                                <Row className="justify-content-center  text-center pt-2 pb-2">
                                    <b>PRICE PER DAY:</b> {currentAd.price} €/day
                                </Row >


                                <Container>
                                    <Row className="justify-content-center  text-center pt-2 pb-2">
                                        <b>RENT STARTED ON:</b> {newdataIn = new Date(dataIn).toISOString().split("T")[0].replaceAll("-", "/")}

                                    </Row>

                                    <Row className="justify-content-center  text-center pt-2 pb-2">
                                        <b>RENT ENDED ON:</b> {newdataOut = new Date(dataOut).toISOString().split("T")[0].replaceAll("-", "/")}
                                    </Row>


                                    <Row className="justify-content-center  text-center pt-2 pb-2">
                                        <b>A 5% surcharge will be added to the total price as a deposit in case of problems which will be returned at the end of the rental.</b>
                                    </Row>

                                    <Row className="justify-content-center  text-center pt-2 pb-2">
                                        <b>SHIPPING COST: </b> 9.99 €.
                                    </Row>


                                    <Row className="justify-content-center border-top text-center pt-3 pb-2">
                                        <b>OVERALL PRICE: </b> {((numDays * currentAd.price) + ((numDays * currentAd.price) * 0.05) + 9.99).toPrecision(4)} €.
                                    </Row>


                                </Container>

                            </Container>

                        </Modal.Body>
                        <Modal.Footer>
                            <Col md={8}>
                                <Button variant="secondary" onClick={() => setShowRecap(false)}>
                                    Close
                                </Button>
                            </Col>
                            <Col md={8}>
                                <Button variant="primary" onClick={handlePressRent}>
                                    Rent
                                </Button>
                            </Col>
                        </Modal.Footer>
                    </Modal>
                </Container>


=======
                    </Modal>
                </Container>

>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
                <Card.Body>

                    {
                        props.rents ?
<<<<<<< HEAD
                            <MyAvailabilityModal show={showCalendar} setShow={setShowCalendar} setClearclick={setClearclick} clearclick={clearclick}
=======
                            <MyAvailabilityModal show={showCalendar} setShow={setShowCalendar}
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
                                dataIn={dataIn} setDataIn={setDataIn} setNumDays={setNumDays}
                                onChange={onChange} dataOut={dataOut} setDataOut={setDataOut}
                                rents={props.rents} currentAd={currentAd} setSubmitted={setSubmitted}>
                            </MyAvailabilityModal>
                            : <></>
                    }

                </Card.Body>

<<<<<<< HEAD
                <Container>
                    <Modal show={showNewMessage} onClose={onCloseNewMessageModal}
                        onHide={onCloseNewMessageModal}>
                        <Modal.Header>
                            <Modal.Title>Contact the renter</Modal.Title>

                        </Modal.Header>


                        <Form onChange={(event) => setNewMessage(event.target.value)}>
                            <Form.Control as="textarea" defaultValue={newMessage + currentAd.title + ", .... "} rows={15} />
                        </Form>

                        <Modal.Footer>

                            <Button variant="secondary" onClick={onCloseNewMessageModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleCreateNewConversation}>
                                Send message
                            </Button>


                        </Modal.Footer>
                    </Modal>
                </Container>

=======
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
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d

            </Card>
        }
    </>

    );
}



export { MySmallAdvertisement, MyBigAdvertisement };