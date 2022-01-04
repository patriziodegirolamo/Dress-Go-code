import { Col, Row, Container, Button, Modal, Alert } from "react-bootstrap";
import { useState } from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";




function MyAvailabilityModal(props) {
    
    const getDates = (start, stop) => {
        const dd1 = start.split("/")[0]
        const mm1 = start.split("/")[1]
        const yyyy1 = start.split("/")[2]

        const dd2 = stop.split("/")[0]
        const mm2 = stop.split("/")[1]
        const yyyy2 = stop.split("/")[2]

        const startDate = new Date(yyyy1, mm1-1, dd1)
        const stopDate = new Date(yyyy2, mm2-1, dd2)

        const dateArray = new Array();
        let currentDate = startDate;
        
          while (currentDate <= stopDate) {
            dateArray.push(currentDate);
            currentDate = addDays(currentDate, 1)
        }
        
        return dateArray;
    }

    const countDays = () => {
        if (props.endDate === props.startDate)
            props.setNumDays(1);
        else
            props.setNumDays(1 + (new Date(props.endDate).getTime() - new Date(props.startDate).getTime()) / (1000 * 3600 * 24))
    }

    /** return 1 if everything is ok, 0 otherwise */
    const checkDate = (dates) => {
        const d1 = new Date(props.startDate).toISOString().split('T')[0].split("-")
        const d2 = new Date(props.endDate).toISOString().split('T')[0].split("-")

        var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
        var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

        let ok = 1;
        dates.map(checkCurrentDate => {
            const c = new Date(checkCurrentDate).toISOString().split('T')[0].split("-")
            const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
            if (check > from && check < to)
                ok = 0;
        })

        return ok;
    }


    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    const noAvailableDates = props.rents.filter(r => r.id_a == props.currentAd.id_a).map(r => {
        const newObj =
        {
            dataIn: r.dataIn,
            dataOut: r.dataOut
        }
        return newObj
    })
    console.log(noAvailableDates)

    let excludedDates = []
    noAvailableDates.map(d => {
        console.log("PROVA", d.dataIn, d.dataOut)
        const prova = getDates(d.dataIn, d.dataOut)
        console.log("PROVA",prova)
        excludedDates = excludedDates.concat(prova)
    });

    const [attention, setAttention] = useState("");

    console.log(excludedDates)

    return <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header>
            <Button onClick={() => props.setShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
            <Container id="datePickerContainer">
                <DatePicker
                    minDate={new Date()}
                    selected={props.startDate}
                    onChange={props.onChange}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    excludeDates={excludedDates}
                    selectsRange
                    selectsDisabledDaysInRange
                    inline
                />
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.setStartDate(new Date())
                        props.setEndDate(new Date())
                        props.setShow(false)
                        props.setNumDays(0)
                    }}>
                        REJECT
                    </Button>
                </Col>

                <Col>
                    <Button onClick={() => {
                        props.setStartDate(new Date())
                        props.setEndDate(new Date())
                        props.setNumDays(0)
                    }}>
                        CLEAR
                    </Button>
                </Col>

                <Col>
                    <Button type="submit" onClick={() => {
                        if (checkDate(excludedDates)) {
                            props.setShow(false)
                            setAttention("")
                            countDays()
                        }
                        else {
                            setAttention("THERE ARE SOME UNAVAILABLE DATES");
                        }
                    }}>
                        ACCEPT
                    </Button>
                </Col>
            </Row>
        </Modal.Footer>


        {
            attention ? <Alert variant="danger">{attention}</Alert> : <></>
        }


    </Modal>
}

export default MyAvailabilityModal;