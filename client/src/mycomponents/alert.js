import { Row, Container, Figure, Button, Alert } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


function MyAlert(props) {


      return (
        <Alert variant="success" onClose={() => props.setShowMyAlert(false)}>
          <Alert.Heading>{props.message}</Alert.Heading>
         </Alert>
        
    );
    
}
export default MyAlert;