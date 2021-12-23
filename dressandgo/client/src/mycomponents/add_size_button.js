import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function AddKnownSizes(props) {

    const { show, onHide } = props;

    const [validated, setValidated] = useState(false);
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");

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
        }
    };

    const handleClose = () => {
        setValidated(false);
        setBrand("");
        setCategory("");
        setSize("");
        onHide();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        //Manual validation

        /*
        var id_max;
        if (knownsizes.length !== 0) {
            id_max = Math.max.apply(Math, knownsizes.map(function (o) { return o.id; }))
        }
        else{
            const new_size = {
                brand: brand,
                category: category,
                size: size
            };
        */


        //if (validated) {
        const new_size = {
            id_u: props.user.id_u,
            brand: brand,
            id_cat: props.categories.find((cat) => cat.name === category).id_cat,
            EUsize: size
        };
        props.addASize(new_size);
        setBrand("");
        setCategory("");
        setSize("");
        onHide();
        //}
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>New known size</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                Enter the size of the brand you know that fits you perfectly.

                <Form className="mt-4" noValidate validated={validated}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Brand*</Form.Label>
                        <Form.Control name="brand" type="text" placeholder="Insert brand name" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Category*</Form.Label>
                        <Form.Select name="category" aria-label="Select category" required onChange={handleChange}>
                            {/*lista completa categorie*/}
                            <option value='null'>Select category</option>
                            {
                                props.categories.map((cat) => {
                                    return <option key={cat.id_cat} value={cat.name}>{cat.name}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Size*</Form.Label>
                        <Form.Control name="size" type="text" placeholder="Insert size" required onChange={handleChange} />
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