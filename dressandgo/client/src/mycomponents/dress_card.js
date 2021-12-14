import { Col, Row, Container, Card, Button, Modal, Form, Carousel } from "react-bootstrap";
import { NavLink as Link, useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import MyAvailabilityModal from './availabilityModal';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";






function MySmallAdvertisement(props) {
    const navigate = useNavigate();

    return (
        <Card key={props.idx} onClick={() => {
            navigate("/ad/" + props.ad.id)
            return props.handleChangeForwardPage(props.ad.cat)
        }
        }>
            <Card.Title>
                {props.ad.name}
            </Card.Title>
            <Card.Img variant="top" src={props.ad.addresses[0]} className="mx-auto m-auto pt-2"
                style={{ width: '50%' }} />

        </Card>
        
    );
}

function MyBigAdvertisement(props) {
    let { idAd } = useParams();

    const [numDays, setNumDays] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const currentAd = props.ads.filter(ad => ad.id == idAd)[0];


    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    return (<>
        <Card key={idAd}>
            <Card.Title>
                {currentAd.name}
            </Card.Title>

            <Container>
            <Carousel variant="dark">
                {currentAd.addresses.map(img => {
                    return <Carousel.Item>
                        <Card.Img variant="top" src={img} className="mx-auto m-auto pt-2"
                            style={{ width: '50%' }} />
                    </Carousel.Item>
                })}
            </Carousel>
            </Container>

            <Card.Body>BRAND: {currentAd.brand}</Card.Body>
            <Card.Body>DESCRIPTION: {currentAd.description}</Card.Body>
            <Card.Body>SIZE: {currentAd.size}</Card.Body>
            <Card.Body>PRICE PER DAY: {currentAd.price} €/day</Card.Body>

            <Card.Body>
                <Button onClick={() => setShowCalendar(true)}>Select dates:</Button>
                <MyAvailabilityModal show={showCalendar} setShow={setShowCalendar}
                    startDate={startDate} setStartDate={setStartDate} setNumDays={setNumDays}
                    onChange={onChange} endDate={endDate} setEndDate={setEndDate}>
                </MyAvailabilityModal>
            </Card.Body>

            {numDays != 0 ?
                <Card.Body>OVERALL PRICE: {(numDays * currentAd.price).toPrecision(4)}</Card.Body>
                : <></>}

            <Container>
                <Button>RENT</Button>
            </Container>
        </Card>
    </>
    );
}
export { MySmallAdvertisement, MyBigAdvertisement };