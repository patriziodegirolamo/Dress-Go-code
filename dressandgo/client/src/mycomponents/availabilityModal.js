import { Col, Row, Container, Button, Modal, Alert } from "react-bootstrap";
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

        const startDate = new Date(yyyy1, mm1-1, dd1)
        const stopDate = new Date(yyyy2, mm2-1, dd2)

        const dateArray = new Array();
        let currentDate = startDate;
        
        console.log(start,stop)
        console.log(startDate.toISOString(), stopDate.toISOString())
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

    let excludedDates = new Array()
    noAvailableDates.map(d => {
        const prova = getDates(d.dataIn, d.dataOut)
        excludedDates = excludedDates.concat(prova)
    });

    console.log(excludedDates)
    const [attention, setAttention] = useState("");


    return <Modal show={props.show} onHide={() => props.setShow(false)}>
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
                            {/*Start date: {props.dataIn.toISOString().split("T")[0]} */}
                        </Col>

                        <Col>
                            {/*End date: {props.dataOut ? props.dataOut.toISOString().split("T")[0] : ""} */}
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


        {
            attention ? <Alert variant="danger">{attention}</Alert> : <></>
        }


    </Modal>
}

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