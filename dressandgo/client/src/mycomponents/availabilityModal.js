import { Col, Row, Container, Button, Modal, Alert} from "react-bootstrap";
import { useState } from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";




function MyAvailabilityModal(props) {
    const excludedDates=[addDays(new Date(), 1), addDays(new Date(), 5)]

    const countDays = () => {
        if( props.endDate === props.startDate)
            props.setNumDays(1);
        else 
            props.setNumDays(1 + (new Date(props.endDate).getTime() - new Date(props.startDate).getTime() ) / (1000 * 3600 * 24) )

    }

    /** return 1 if everything is ok, 0 otherwise */
    const checkDate = (dates) => {
        const d1 = new Date(props.startDate).toISOString().split('T')[0].split("-")
        const d2 = new Date(props.endDate).toISOString().split('T')[0].split("-")

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
        var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);

        let ok = 1;
        dates.map(checkCurrentDate => {
            const c = new Date(checkCurrentDate).toISOString().split('T')[0].split("-")
            const check = new Date(c[2], parseInt(c[1])-1, c[0]);
            if(check > from && check < to)
                ok = 0;
        })
        
        return ok;
    } 
 

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const [attention, setAttention] = useState("");

    return <Modal show={props.show} onHide={() => props.setShow(false)}>
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
        <Row>
            <Col>
                <Container>
                <Button onClick={() => {
                    props.setStartDate(new Date())
                    props.setEndDate(new Date())
                    props.setShow(false)
                    props.setNumDays(0)
                }}>
                    REJECT
                </Button>
                </Container>
            </Col>
            <Col>
                <Button type="submit" onClick={() => {
                    if(checkDate(excludedDates)){
                        props.setShow(false)
                        setAttention("")
                        countDays()
                    }
                    else{
                        setAttention("THERE ARE SOME UNAVAILABLE DATES");
                    }
                    }}>
                    ACCEPT
                </Button>
            </Col>
        </Row>
        {
          attention ? <Alert variant="danger">{attention}</Alert> : <></>
        }
      

    </Modal>
}

export default MyAvailabilityModal;