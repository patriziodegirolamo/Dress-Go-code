import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Col, Row, Container, Button, ButtonGroup, Accordion, Table, Figure } from "react-bootstrap";


function SizeGuide(props) {
    let [type, setType] = useState("")

    return <>
        <Container style={{marginBottom:40, backgroundColor: "#f7a2c2"}}>
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

        {type == "man" ? <>
            <Container>
                <h4>INTERNATIONAL MENS FIT GUIDE</h4>
                <h5>How to measure your body:</h5>
                <p>Using a tape measure, have someone take your measurements as noted below</p>

                <Figure>
                    <Figure.Image src="man_guide.png" />
                </Figure>

                <Accordion>
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

                <Container style={{marginTop: 30}}>
                <h5>Top or Bottom</h5>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Top Garments</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered responsive hover>
                                <thead>
                                    <tr>
                                        <th colSpan={5}>
                                            Man Top Garments
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
                                        <td>42/44</td>
                                        <td>46/48</td>
                                        <td>50/52</td>
                                        <td>54/56</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>CM larghezza Spalle</td>
                                        <td>43</td>
                                        <td>44</td>
                                        <td>45</td>
                                        <td>46</td>
                                    </tr>

                                    <tr>
                                        <td>CM circonferenza torace</td>
                                        <td>102</td>
                                        <td>106</td>
                                        <td>110</td>
                                        <td>114</td>
                                    </tr>

                                    <tr>
                                        <td>CM Lunghezza</td>
                                        <td>75</td>
                                        <td>77</td>
                                        <td>79</td>
                                        <td>81</td>
                                    </tr>

                                    <tr>
                                        <td>CM Lunghezza manica</td>
                                        <td>62</td>
                                        <td>65</td>
                                        <td>66</td>
                                        <td>68</td>
                                    </tr>

                                </tbody>
                            </Table>

                            <Figure>
                                <Figure.Image src="top_guide.jpg" />
                            </Figure>

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Bottom Garments</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered responsive hover>
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
                                        <td>42/44</td>
                                        <td>46/48</td>
                                        <td>50/52</td>
                                        <td>54/56</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>CM vita</td>
                                        <td>82</td>
                                        <td>86</td>
                                        <td>91</td>
                                        <td>96</td>
                                    </tr>

                                    <tr>
                                        <td>CM fianchi</td>
                                        <td>108</td>
                                        <td>112</td>
                                        <td>117</td>
                                        <td>122</td>
                                    </tr>

                                    <tr>
                                        <td>CM Circonferenza Coscia</td>
                                        <td>65</td>
                                        <td>67</td>
                                        <td>70</td>
                                        <td>72</td>
                                    </tr>


                                    <tr>
                                        <td>CM LUNGHEZZA</td>
                                        <td>98</td>
                                        <td>100</td>
                                        <td>102</td>
                                        <td>104</td>
                                    </tr>

                                </tbody>
                            </Table>

                            <Figure>
                                <Figure.Image src="pants_guide.jpg" />
                            </Figure>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Container>
            </Container>
        </> : <></>}




        {type == "woman" ? <Container>
            <h4>INTERNATIONAL LADIES FIT GUIDE</h4>

            <h5>How to measure your body:</h5>
            <p>Using a tape measure, have someone take your measurements as noted below</p>

            <Figure>
                <Figure.Image src="woman_guide.png" />
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

            <h4>Top or Bottom</h4>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Top Garments</Accordion.Header>
                    <Accordion.Body>
                        <Table striped bordered responsive hover>
                            <thead>
                                <tr>
                                    <th colSpan={5}>
                                        Woman Bottom Garments
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
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44/46</td>
                                    <td>48</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>CM larghezza Spalle</td>
                                    <td>39</td>
                                    <td>40</td>
                                    <td>41</td>
                                    <td>43</td>
                                </tr>

                                <tr>
                                    <td>CM circonferenza torace</td>
                                    <td>93</td>
                                    <td>97</td>
                                    <td>103</td>
                                    <td>109</td>
                                </tr>

                                <tr>
                                    <td>CM Lunghezza</td>
                                    <td>69</td>
                                    <td>70</td>
                                    <td>71</td>
                                    <td>73</td>
                                </tr>

                                <tr>
                                    <td>CM Lunghezza manica</td>
                                    <td>61</td>
                                    <td>62</td>
                                    <td>64</td>
                                    <td>66</td>
                                </tr>

                            </tbody>
                        </Table>

                        <Figure>
                            <Figure.Image src="top_guide.jpg" />
                        </Figure>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Bottom Garments</Accordion.Header>
                    <Accordion.Body>
                        <Table striped bordered responsive hover>
                            <thead>
                                <tr>
                                    <th colSpan={6}>
                                        Woman Bottom Garments
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
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44/46</td>
                                    <td>48</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>CM vita</td>
                                    <td>65</td>
                                    <td>69</td>
                                    <td>73</td>
                                    <td>79</td>
                                    <td>85</td>
                                </tr>

                                <tr>
                                    <td>CM fianchi</td>
                                    <td>103</td>
                                    <td>107</td>
                                    <td>111</td>
                                    <td>117</td>
                                    <td>123</td>
                                </tr>

                                <tr>
                                    <td>CM Circonferenza Coscia</td>
                                    <td>66</td>
                                    <td>68</td>
                                    <td>70</td>
                                    <td>74</td>
                                    <td>77</td>
                                </tr>


                                <tr>
                                    <td>CM LUNGHEZZA</td>
                                    <td>105</td>
                                    <td>106</td>
                                    <td>107</td>
                                    <td>109</td>
                                    <td>110</td>
                                </tr>

                            </tbody>
                        </Table>

                        <Figure>
                            <Figure.Image src="pants_guide.jpg" />
                        </Figure>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>




        </Container> : <></>}

    </>

}

export default SizeGuide;