import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Col, Row, Container, Button, ButtonGroup, Accordion, Table, Figure } from "react-bootstrap";


function SizeGuide(props) {

    /**
     *   <Container>
            Please select your preferred size guide
            <ButtonGroup>
                <Button size="lg" onClick={() => {
                    setType("man")
                }}>Man</Button>
                <Button size="lg" onClick={() => {
                    setType("woman")
                }}>Woman</Button>
            </ButtonGroup>
        </Container>
    */

    return <>
      

        {props.type === "man" ? <Container>
            <h4>INTERNATIONAL MENS FIT GUIDE</h4>
            <h5>How to measure:</h5>
            <p>Using a tape measure, have someone take your measurements as noted below</p>

<img alt = 'noimage' className = 'small' src = '/man_guide.png' width="100%" />
            

            <Accordion className="pb-3">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Chest Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Measure the chest with the tape
                        measure underneath the arms, across the shoulder blades, and
                        over the fullest part of the chest. The measuring tape should be
                        snug but not tight.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Waist Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Measure the natural waist. Place your
                        index finger between the tape for a comfortable fit.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Neck Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Measure around the mid point of your
                        neck. Place your index finger between the tape and your neck
                        for a comfortable fit.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Inseam Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Measure from crotch seam to hem
                        at the inside leg seam on a pair of similar style trousers (not
                        jeans). Alternatively, measure on body from crotch to floor
                        with tape measure.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>Hip Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Stand with heels together and measure
                        around the fullest part of your Hips. The measuring tape should
                        snug but not tight
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th colSpan={5}>
                            Man Bottom Garments
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ALPHA SIZE EQUIVELANT</td>
                        <td>S</td>
                        <td>M</td>
                        <td>L</td>
                        <td>XL</td>
                    </tr>
                    <tr>
                        <td>EURO-ITALY</td>
                        <td>42-44</td>
                        <td>46-48</td>
                        <td>50-52</td>
                        <td>54-56</td>
                    </tr>

                </tbody>
            </Table>
        </Container> : <></>}




        {props.type === "woman" ? <Container>
            <h4>INTERNATIONAL LADIES FIT GUIDE</h4>

            <h5>How to measure:</h5>
            <p>Using a tape measure, have someone take your measurements as noted below</p>

            <Figure>
                <Figure.Image src="/woman_guide.png" />
            </Figure>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Bust Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Measure the chest with the tape measure underneath
                        the arms, across the shoulder blades, and over the fullest part of the bust. The
                        measuring tape should be snug but not tight.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Waist Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Measure the natural waist at the smallest part of the
                        waist. The measuring tape should be snug but not tight.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Hip Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Stand with your heels together and measure around the
                        fullest part of your hips. The measuring tape should be snug but not tight.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Inseam Measurements:</Accordion.Header>
                    <Accordion.Body>
                        Measure inside leg seam from crotch seam to hem on
                        a pair of similar style trousers (not jeans). Alternatively, measure on body from
                        crotch to floor with tape measure.
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>


            <Table striped bordered>
                <thead>
                    <tr>
                        <th colSpan={6}>
                            Ladies Top/Bottom Garments
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ALPHA SIZE EQUIVELANT</td>
                        <td>XS</td>
                        <td>S</td>
                        <td>M</td>
                        <td>L</td>
                        <td>XL</td>
                    </tr>
                    <tr>
                        <td>EURO-ITALY</td>
                        <td>38-40</td>
                        <td>42</td>
                        <td>44</td>
                        <td>46-48</td>
                        <td>50</td>
                    </tr>

                </tbody>
            </Table>


        </Container> : <></>}

    </>

}

export default SizeGuide;