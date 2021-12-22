import { Container, Card, Button, Carousel } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import MyAvailabilityModal from './availabilityModal';


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

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const currentAd = props.ads.filter(ad => ad.id_a === idAd)[0];
    const currentImages = props.adsImages.filter(adImg => adImg.id_a === idAd);

    console.log(props.adsImages)

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    return (<>
        <Card key={idAd}>
            <Card.Title>
                {currentAd.title}
            </Card.Title>

            <Container>
                <Carousel variant="dark">
                    {currentImages.map((img, idx) => {
                        console.log(img)
                        return <Carousel.Item key = {idx}>
                            <Card.Img variant="top" src={img.url} className="mx-auto m-auto pt-2"
                                style={{ paddingLeft: 30, paddingRight: 50 }} />
                        </Carousel.Item>
                    })}
                </Carousel>
            </Container>

            <Card.Body>BRAND: {currentAd.brand}</Card.Body>
            <Card.Body>DESCRIPTION: {currentAd.description}</Card.Body>
            <Card.Body>SIZE: {currentAd.size}</Card.Body>
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

            <Container id="middleButtonContainer">
                <Button>RENT</Button>
            </Container>
        </Card>
    </>
    );
}
export { MySmallAdvertisement, MyBigAdvertisement };