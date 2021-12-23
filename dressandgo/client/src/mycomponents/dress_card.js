import { Container, Card, Button, Carousel, Modal, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import MyAvailabilityModal from './availabilityModal';
import SizeGuide from "./mySizeGuide";

import "react-datepicker/dist/react-datepicker.css";



function MySmallAdvertisement(props) {
    const navigate = useNavigate();
    return (
        <Card key={props.idx} onClick={() => {
            navigate("/ad/" + props.ad.id_a)
            return props.handleChangeForwardPage(props.categories.find((el) => el.id_cat === props.ad.id_cat).name)
        }
        }>
            <Card.Title>
                {props.ad.title}
            </Card.Title>
            <Card.Img variant="top" src={props.adsImages.find((el) => el.position === 1).url} className="mx-auto m-auto pt-2"
                style={{ width: '50%' }} />

        </Card>

    );
}

function MyBigAdvertisement(props) {

    let { idAd } = useParams();
    idAd = parseInt(idAd);

    const [numDays, setNumDays] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const currentAd = props.ads.filter(ad => ad.id_a === idAd)[0];
    const currentImages = props.adsImages.filter(adImg => adImg.id_a === idAd);
    const vendor = props.users.filter(u => u.id_u == currentAd.id_u)[0]

    const [showNewMessage, setShowNewMessage] = useState(false);

    const initialMessage = "Hi " + ", I'm contacting you, " + vendor.name + " " + vendor.surname + ", for the advertisement: " + currentAd.title + ", " 
    //TODO: aggiungere il nome del tizio che ha creato l'annuncio

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

    return (<>
        <Card key={idAd}>
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
                <Button onClick={() => setShowSizeGuide(true)}>How to misure your size</Button>
            </Container>
            <Container>
                <Modal show={showSizeGuide} onClose={() => setShowSizeGuide(false)} onHide={() => setShowSizeGuide(false)}>
                    <SizeGuide type={currentAd.gender} />
                </Modal>
            </Container>
            <Card.Body>PRICE PER DAY: {currentAd.price} €/day</Card.Body>

            <Card.Body>
                <Container id="middleButtonContainer">
                    <Button onClick={() => setShowCalendar(true)}>Select dates:</Button>
                </Container>
                <MyAvailabilityModal show={showCalendar} setShow={setShowCalendar}
                    startDate={startDate} setStartDate={setStartDate} setNumDays={setNumDays}
                    onChange={onChange} endDate={endDate} setEndDate={setEndDate}>
                </MyAvailabilityModal>
            </Card.Body>

            {numDays !== 0 ?
                <Card.Body>OVERALL PRICE: {(numDays * currentAd.price).toPrecision(4)}</Card.Body>
                : <></>}

            <Container>
                <Button onClick={() => setShowNewMessage(true)}>SEND A MESSAGE</Button>
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
                        <Form.Control as="textarea" defaultValue={newMessage} rows={15} />
                    </Form>

                    <Modal.Footer>
                        <Container>
                            {/**TODO: invia messaggio tramite API */}
                            <Button type="submit" onClick={() => {
                            }}>Send</Button>
                        </Container>
                    </Modal.Footer>
                </Modal>
            </Container>

            <Container id="middleButtonContainer">
                <Button>RENT</Button>
            </Container>
        </Card>
    </>

    );
}



export { MySmallAdvertisement, MyBigAdvertisement };