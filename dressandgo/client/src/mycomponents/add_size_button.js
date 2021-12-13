import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function AddKnownSizes(props) {

    const { show, onHide, setKnownsizes, knownsizes } = props;

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

        var id_max;
        if (knownsizes.length !== 0) {
            id_max = Math.max.apply(Math, knownsizes.map(function (o) { return o.id; }))
        }
        else
            id_max = 0;

        const new_size = {
            id: id_max + 1,
            brand: brand,
            category: category,
            size: size
        };


        if(validated)
        {
        setKnownsizes(knownsizes.concat(new_size));
        onHide();
        }
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
                            <option value="null">Select category</option>
                            <option value="Shoes">Shoes</option>
                            <option value="T-Shirt">T-Shirt</option>
                            <option value="Trousers">Trousers</option>
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