import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function AddKnownSizes(props) {

    const { show, onHide } = props;

    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [submitted, setSubmitted] = useState(false);

    let flags = {};
    let uniqueCat = props.categories.filter(function (entry) {
        if (flags[entry.name]) {
            return false;
        }
        flags[entry.name] = true;
        return true;
    });

    const handleChange = (event) => {

        const target = event.target;
        let value = target.value;
        const name = target.name;

        switch (name) {
            case "brand":
                setBrand(value);
                break;
            case "category":
                setCategory(value);
                break;
            case "size":
                setSize(value);
                break;
            default:
                break;
        }
    };

    const handleClose = () => {
        setSubmitted(false);
        setBrand("");
        setCategory("");
        setSize("");
        onHide();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }



        //Manual validation

        if (brand === "" || size === "" || category === "") {

        }
        else {
            const new_size = {
                id_u: props.user.id_u,
                brand: brand,
                id_cat: props.categories.find((cat) => cat.name === category).id_cat,
                EUsize: size
            };

            props.addASize(new_size);

            setSubmitted(false);
            setBrand("");
            setCategory("");
            setSize("");
            props.setShowMyAlert(true);
            setTimeout(() => props.setShowMyAlert(false), 2000)
            onHide()

        }






    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>New known size</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                Enter the size of the brand you know that fits you perfectly.

                <Form className="mt-4">
                    <Form.Group className="mb-3" >
                        <Form.Label>Brand*</Form.Label>
                        <Form.Select name="brand" aria-label="Select brand name" required isValid={submitted && brand ? true : false} isInvalid={submitted && !brand ? true : false} onChange={handleChange}>
                            {/*lista completa brand*/}
                            <option></option>
                            {
                                props.brands.map((x) => {
                                    return <option key={x.id_b} value={x.name}>{x.name}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Category*</Form.Label>
                        <Form.Select name="category" aria-label="Select category" required isValid={submitted && category ? true : false} isInvalid={submitted && !category ? true : false} onChange={handleChange}>
                            {/*lista completa categorie*/}
                            <option></option>
                            {
                                uniqueCat.map((x) => {
                                    return <option key={x.id_cat} value={x.name}>{x.name}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Size*</Form.Label>


                        {((category === "Shoes" || category === "Socks") ? (


                            <Form.Select name="size" aria-label="Select size" required isValid={submitted && size ? true : false} isInvalid={submitted && !size ? true : false} onChange={handleChange}>
                                {/*lista completa categorie*/}
                                <option></option>
                                <option value="25" key="25EU">25EU</option>
                                <option value="26" key="26EU" >26EU</option>
                                <option value="27" key="27EU">27EU</option>
                                <option value="28" key="28EU">28EU</option>
                                <option value="29" key="29EU">29EU</option>
                                <option value="30" key="30EU">30EU</option>
                                <option value="31" key="31EU">31EU</option>
                                <option value="32" key="32EU">32EU</option>
                                <option value="33" key="33EU">33EU</option>
                                <option value="34" key="34EU">34EU</option>
                                <option value="35" key="35EU">35EU</option>
                                <option value="36" key="36EU">36EU</option>
                                <option value="37" key="37EU">37EU</option>
                                <option value="38" key="38EU">38EU</option>
                                <option value="39" key="39EU">39EU</option>
                                <option value="40" key="40EU">40EU</option>
                                <option value="41" key="41EU">41EU</option>
                                <option value="42" key="42EU">42EU</option>
                                <option value="43" key="43EU">43EU</option>
                                <option value="44" key="44EU">44EU</option>
                                <option value="45" key="45EU">45EU</option>
                                <option value="46" key="46EU">46EU</option>
                                <option value="47" key="47EU">47EU</option>
                                <option value="48" key="48EU">48EU</option>
                                <option value="49" key="49EU">49EU</option>
                                <option value="50" key="50EU">50EU</option>





                            </Form.Select>
                        ) : (



                            (category === "Trousers" || category === "Skirts" || category === "Blouses") ? (
                                <Form.Select name="size" aria-label="Select size" required isValid={submitted && size ? true : false} isInvalid={submitted && !size ? true : false} onChange={handleChange}>
                                    {/*lista completa categorie*/}
                                    <option></option>
                                    <option value="32" key="32IT">32IT</option>
                                    <option value="34" key="34IT">34IT</option>
                                    <option value="36" key="36IT">36IT</option>
                                    <option value="37" key="37IT">37IT</option>
                                    <option value="38" key="38IT">38IT</option>
                                    <option value="39" key="39IT">39IT</option>
                                    <option value="40" key="40IT">40IT</option>
                                    <option value="41" key="41IT">41IT</option>
                                    <option value="42" key="42IT">42IT</option>
                                    <option value="43" key="43IT">43IT</option>
                                    <option value="44" key="44IT">44IT</option>
                                    <option value="45" key="45IT">45IT</option>
                                    <option value="46" key="46IT">46IT</option>
                                    <option value="47" key="47IT">47IT</option>
                                    <option value="48" key="48IT">48IT</option>
                                    <option value="49" key="49IT">49IT</option>
                                    <option value="50" key="50IT">50IT</option>
                                    <option value="51" key="51IT">51IT</option>
                                    <option value="52" key="52IT">52IT</option>
                                    <option value="53" key="53IT">53IT</option>
                                    <option value="54" key="54IT">54IT</option>
                                    <option value="55" key="55IT">55IT</option>
                                    <option value="56" key="56IT">56IT</option>





                                </Form.Select>)


                                :
                                (<Form.Select name="size" aria-label="Select size" required isValid={submitted && size ? true : false} isInvalid={submitted && !size ? true : false} onChange={handleChange}>
                                    {/*lista completa categorie*/}

                                    <option></option>
                                    <                  option value="XXXS">XXXS</option>
                                    <option value="XXS" key="XXS">XXS</option>
                                    <option value="XS" key="XS">XS</option>
                                    <option value="S" key="S">S</option>
                                    <option value="M" key="M">M</option>
                                    <option value="L" key="L">L</option>
                                    <option value="XL" key="XL">XL</option>
                                    <option value="XXL" key="XXL">XXL</option>
                                    <option value="XXXL" key="XXXL">XXXL</option>




                                </Form.Select>)
                        ))
                        }





                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Insert
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddKnownSizes;