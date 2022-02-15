import { Col, Row, Container, Button, Modal, Alert, Accordion } from "react-bootstrap";
import { useState } from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function MyAvailabilityModal(props) {

    const getDates = (start, stop) => {
        const yyyy1 = start.split("/")[0]
        const mm1 = start.split("/")[1]
        const dd1 = start.split("/")[2]

        const yyyy2 = stop.split("/")[0]
        const mm2 = stop.split("/")[1]
        const dd2 = stop.split("/")[2]

        const startDate = new Date(yyyy1, mm1 - 1, dd1)
        const stopDate = new Date(yyyy2, mm2 - 1, dd2)

        const dateArray = new Array();
        let currentDate = startDate;

        while (currentDate <= stopDate) {
            dateArray.push(currentDate);
            currentDate = addDays(currentDate, 1)
        }

        return dateArray;
    }

    const countDays = () => {
        if (props.dataOut === props.dataIn)
            props.setNumDays(1);
        else
            props.setNumDays(1 + (new Date(props.dataOut).getTime() - new Date(props.dataIn).getTime()) / (1000 * 3600 * 24))
    }

    /** return 1 if everything is ok, 0 otherwise */
    const checkDate = (dates) => {
        const d1 = new Date(props.dataIn).toISOString().split('T')[0].split("-")
        const d2 = new Date(props.dataOut).toISOString().split('T')[0].split("-")


        var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
        var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        let ok = 1;
        dates.map(checkCurrentDate => {
            const c = new Date(checkCurrentDate).toISOString().split('T')[0].split("-")
            const check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
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

    let excludedDates = new Array()

    noAvailableDates.map(d => {
        const prova = getDates(d.dataIn, d.dataOut)
        excludedDates = excludedDates.concat(prova)
    });

    const [attention, setAttention] = useState("");


    return <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header >
            <Modal.Title> Select dates for your rent</Modal.Title>

        </Modal.Header>
        <Modal.Body>
            <Accordion style={{ paddingBottom: 40 }}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Instructions</Accordion.Header>
                    <Accordion.Body>
                        <h4>Steps:</h4>
                        <p>1) tap a day to select the starting date</p>
                        <p>2) tap a day to select the ending date</p>
                        <p>3) if you did a mistake in either 1) or 2), you can: </p>
                        <p>3.1) complete tre procedure and start again without pressinc ACCEPT</p>
                        <p>3.2) press CLEAR</p>

                    </Accordion.Body>

                </Accordion.Item>
            </Accordion>
            <Container id="datePickerContainer">
                <DatePicker
                    minDate={new Date()}
                    selected={props.dataIn}
                    onChange={props.onChange}
                    startDate={props.dataIn}
                    endDate={props.dataOut}
                    excludeDates={excludedDates}
                    selectsRange
                    selectsDisabledDaysInRange
                    inline
                />
            </Container>

            <Container className="mt-3  justify-content-around">
                <Row className="justify-content-around">
                    <Col style={{ textAlign: "center" }}>
                        {props.clearclick ? <><b>Start date:</b> <br></br> {props.dataIn.toISOString().split("T")[0]}</> : ""}
                    </Col>

                    <Col style={{ textAlign: "center" }}>
                        {props.clearclick && props.dataOut ? <><b>End date:</b> <br></br> {props.dataOut.toISOString().split("T")[0]}</> : ""}
                    </Col>

                </Row>
                <Row>

                </Row>
            </Container>
            <Container className="my-3" style={{ textAlign: "center" }}>
                <Button id="clear"
     onClick={() => {
                    props.setDataIn(new Date())
                    props.setDataOut(new Date())
                    props.setNumDays(0)
                    props.setClearclick(false)
                    props.setSubmitted(false)

                }}>
                    Clear selection
                </Button>
            </Container>
        </Modal.Body>


        <Modal.Footer>
            <Button variant="secondary" onClick={() => {
                props.setDataIn(new Date())
                props.setDataOut(new Date())
                props.setShow(false)
                props.setNumDays(0)
                props.setSubmitted(false)

            }}>
                Close
            </Button>

            <Button type="submit" onClick={() => {
                if ((checkDate(excludedDates)) && (props.dataOut!=undefined)) {
                    props.setShow(false)
                    setAttention("")
                    countDays()


                    props.setSubmitted(true)

                }
                else {

                    if(props.dataOut!=undefined)
                    {
                        setAttention("END DATE MISSING");
                    }

                    else
                    {
                        setAttention("THERE ARE SOME UNAVAILABLE DATES");
                    }
                   
                    props.setSubmitted(false)

                }
            }}>
                Accept
            </Button>
        </Modal.Footer>







        {
            attention ? <Alert variant="danger">{attention}</Alert> : <></>
        }


    </Modal>
}

export default MyAvailabilityModal;