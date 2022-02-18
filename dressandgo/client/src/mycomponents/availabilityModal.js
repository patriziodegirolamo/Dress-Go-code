import { Col, Row, Container, Button, Modal, Alert, Accordion } from "react-bootstrap";
import { useState } from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


<<<<<<< HEAD
=======


>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
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

<<<<<<< HEAD
        const dateArray = [];
        let currentDate = startDate;

=======
        const dateArray = new Array();
        let currentDate = startDate;

        console.log(start, stop)
        console.log(startDate.toISOString(), stopDate.toISOString())
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
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

<<<<<<< HEAD

        var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
        var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        let ok = 1;
        dates.map(checkCurrentDate => {
            const c = new Date(checkCurrentDate).toISOString().split('T')[0].split("-")
            const check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
            if (check > from && check < to)
                ok = 0;
            
=======
        var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
        var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

        let ok = 1;
        dates.map(checkCurrentDate => {
            const c = new Date(checkCurrentDate).toISOString().split('T')[0].split("-")
            const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
            if (check > from && check < to)
                ok = 0;
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
        })

        return ok;
    }


    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


<<<<<<< HEAD
    const noAvailableDates = props.rents.filter(r => r.id_a === props.currentAd.id_a).map(r => {
        const date = new Date(r.dataOut);
        date.setDate(date.getDate() + 3);
        const newYear = date.toISOString().split("-")[0];
        const newMonth = date.toISOString().split("-")[1];
        const newDay = date.toISOString().split("-")[2].split("T")[0];
        const newDataOut = newYear + "/" + newMonth + "/" + newDay;

        const newObj =
        {
            dataIn: r.dataIn,
            dataOut: newDataOut
=======
    const noAvailableDates = props.rents.filter(r => r.id_a == props.currentAd.id_a).map(r => {
        const newObj =
        {
            dataIn: r.dataIn,
            dataOut: r.dataOut
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
        }
        return newObj
    })

<<<<<<< HEAD
    let excludedDates = []

=======
    let excludedDates = new Array()
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
    noAvailableDates.map(d => {
        const prova = getDates(d.dataIn, d.dataOut)
        excludedDates = excludedDates.concat(prova)
    });

<<<<<<< HEAD
    const [attention, setAttention] = useState("");

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let tomorrow = today;
    today = yyyy + '/' + mm + '/' + dd;
    tomorrow.setDate(tomorrow.getDate() + 1);
    const newYear = tomorrow.toISOString().split("-")[0];
    const newMonth = tomorrow.toISOString().split("-")[1];
    const newDay = tomorrow.toISOString().split("-")[2].split("T")[0];
    tomorrow = newYear + "/" + newMonth + "/" + newDay;

    const todayExcl = getDates(today, tomorrow);
    excludedDates = excludedDates.concat(todayExcl);

    return <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header >
            <Modal.Title> Select dates for your rent</Modal.Title>

        </Modal.Header>
        <Modal.Body>
            <Accordion style={{ paddingBottom: 40 }}>
=======
    console.log(excludedDates)
    const [attention, setAttention] = useState("");


    return <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Availability calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Accordion style={{paddingBottom:40}}>
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Instructions</Accordion.Header>
                    <Accordion.Body>
                        <h4>Steps:</h4>
                        <p>1) tap a day to select the starting date</p>
                        <p>2) tap a day to select the ending date</p>
                        <p>3) if you did a mistake in either 1) or 2), you can: </p>
                        <p>3.1) complete tre procedure and start again without pressinc ACCEPT</p>
                        <p>3.2) press CLEAR</p>
<<<<<<< HEAD
                        <p>* the rental can start at least from tomorrow, considering shipment times. </p>
=======
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d

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

<<<<<<< HEAD
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
                        setAttention("")

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
                setAttention("")

            }}>
                Close
            </Button>

            <Button type="submit" onClick={() => {
                let now = new Date();

                if ((checkDate(excludedDates)) && (props.dataOut != null && props.dataOut !== undefined) && 
                        (props.dataIn != null && props.dataIn !== undefined) && (props.dataIn.getDate() !== now.getDate()) && (props.dataOut.getDate() !== now.getDate())) {
                    props.setShow(false)
                    setAttention("")
                    countDays()
                    props.setSubmitted(true)

                }
                else {
                    if (props.dataOut === undefined || props.dataOut === null) {
                        setAttention("END DATE MISSING");
                    }
                    else if(props.dataIn === undefined || props.dataIn === null)
                        setAttention("START DATE MISSING");

                    else {
                        setAttention("THERE ARE SOME UNAVAILABLE DATES");
                    }

                    props.setSubmitted(false)

                }
            }}>
                Accept
            </Button>
        </Modal.Footer>







=======
            <Container>
                <Row className="my-3 justify-content-center" >
                    <Col className="col-4" > <b>Start date:</b>
                    </Col>
                    <Col className="col-4"> {props.dataIn.toISOString().split("T")[0]}
                    </Col>
                    </Row>

                    <Row className="my-3 justify-content-center" >
                    <Col className="col-4" > <b>End date:</b>
                    </Col>
                    <Col className="col-4"> {props.dataOut ? props.dataOut.toISOString().split("T")[0] : ""}
                    </Col>
                    
                </Row>
             


             
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Row className="justify-content-between">
                {/*<Col>
                    <Button onClick={() => {
                        props.setDataIn(new Date())
                        props.setDataOut(new Date())
                        props.setShow(false)
                        props.setNumDays(0)
                        props.setSubmitted(false)

                    }}>
                        REJECT
                    </Button>
                </Col>*/}

                <Col>
                    <Button variant="secondary" onClick={() => {
                        props.setDataIn(new Date())
                        props.setDataOut(new Date())
                        props.setNumDays(0)
                        props.setSubmitted(false)

                    }}>
                        CLEAR
                    </Button>
                </Col >

                <Col>
                    <Button type="submit" onClick={() => {
                        if (checkDate(excludedDates)) {
                            props.setShow(false)
                            setAttention("")
                            countDays()
                            props.setSubmitted(true)

                        }
                        else {
                            setAttention("THERE ARE SOME UNAVAILABLE DATES");
                            props.setSubmitted(false)

                        }
                    }}>
                        ACCEPT
                    </Button>
                </Col>
            </Row>
        </Modal.Footer>


>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
        {
            attention ? <Alert variant="danger">{attention}</Alert> : <></>
        }


    </Modal>
}

<<<<<<< HEAD
export default MyAvailabilityModal;
=======
export default MyAvailabilityModal;
/**
function MyAvailabilityModal(props) {

    const getDates = () => {

        const dIn = props.dataIn.toISOString().split("T")[0];
        const dOut = props.dataOut ? props.dataOut.toISOString().split("T")[0] : "";
        const dateArray = new Array();
        if(dOut === ""){

        }
        else{
            let currentDate = dIn;
            console.log(currentDate)
            while (currentDate <= dOut) {
                //dateArray.push(currentDate);
                
                currentDate = addDays(currentDate, 1)
                console.log(currentDate)
            }
             
        }

        return dateArray;
    }

    const countDays = () => {
        if (props.dataOut === props.dataIn)
            props.setNumDays(1);
        else
            props.setNumDays(1 + (new Date(props.dataOut).getTime() - new Date(props.dataIn).getTime()) / (1000 * 3600 * 24))
    }

    const checkDate = (dates) => {
        const d1 = new Date(props.dataIn).toISOString().split('T')[0].split("-")
        const d2 = new Date(props.dataOut).toISOString().split('T')[0].split("-")

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
        console.log(result)
        //result.setDate(result.getDate() + days);
        return result;
    }

    let excludedDates = new Array();
    props.rents.filter(r => r.id_a === props.currentAd.id_a).forEach(r => {
        const newObj =
        {
            dataIn: r.dataIn,
            dataOut: r.dataOut
        }

        const prova = getDates(newObj.dataIn, newObj.dataOut);
        excludedDates = excludedDates.concat(prova);
    })

    const [attention, setAttention] = useState("");

    //console.log(excludedDates)
    return <>

        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header>
                <Button onClick={() => props.setShow(false)}>X</Button>
            </Modal.Header>
            <Modal.Body>
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

                <Container>
                    <Row>
                        <Col>
                            Start date: {props.dataIn.toISOString().split("T")[0]}
                        </Col>

                        <Col>
                            End date: {props.dataOut ? props.dataOut.toISOString().split("T")[0] : ""}
                        </Col>
                    
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col>
                        <Button onClick={() => {
                            props.setDataIn(new Date())
                            props.setDataOut(new Date())
                            props.setShow(false)
                            props.setNumDays(0)
                            props.setSubmitted(false)
                        }}>
                            REJECT
                        </Button>
                    </Col>

                    <Col>
                        <Button onClick={() => {
                            props.setDataIn(new Date())
                            props.setDataOut(new Date())
                            props.setNumDays(0)
                            props.setSubmitted(false)
                        }}>
                            CLEAR
                        </Button>
                    </Col>

                    <Col>
                        <Button type="submit" onClick={() => {
                            if( props.dataOut == null){
                                props.setSubmitted(false)
                                setAttention("PLEASE CHOOSE THE END DATE");
                            }
                            else{
                                if (checkDate(excludedDates)) {
                                    props.setShow(false)
                                    setAttention("")
                                    countDays()
                                    props.setSubmitted(true)
                                }
                                else {
                                    props.setSubmitted(false)
                                    setAttention("THERE ARE SOME UNAVAILABLE DATES");
                                }
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
    </>
}

export default MyAvailabilityModal;
*/
>>>>>>> d81640f2c90eff364c653d887809149fa3c7dd2d
