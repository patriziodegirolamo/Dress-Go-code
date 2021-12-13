import { Modal, Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddKnownSizes(props) {

    const { show, onHide } = props;

    const handleClose = () => {
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>New known size</Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
        Enter the size of the brand you know that fits you perfectly.

                <Form className="mt-4" >
                    <Form.Group className="mb-3" >
                        <Form.Label>Brand*</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Insert brand name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Category*</Form.Label>
                        <Form.Select aria-label="Select category">
                        <option>Select category</option>
                        <option value="1">Shoes</option>
                        <option value="2">T-Shirt</option>
                        <option value="3">Trousers</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Size*</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Insert size" required />
                    </Form.Group>

                  
                  
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Insert
                </Button>
               
            </Modal.Footer>
        </Modal>
    );
}
export default AddKnownSizes;