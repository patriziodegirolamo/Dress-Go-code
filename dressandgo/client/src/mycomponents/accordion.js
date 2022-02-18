import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink as Link } from "react-router-dom";



export default function Faq(){
return(
<>
<Accordion>
<Container>
        <Row className="pt-2">
          <h3 style={{ textAlign: "center" }}>FAQ</h3>
        </Row>

      </Container>



  <Accordion.Item eventKey="0">
    <Accordion.Header>How to order</Accordion.Header>
        <Accordion.Body>
        With the Dress & Go app ordering won't be a problem.
        You just have to follow very few and simple steps. 
        Once you have found the t-shirt of your dream for your very special occasion, check if it fits you perfectly using the size guide.
        Then select the starting and ending date of your rent, checking the availability on the calendar.
        Finally press the "Rent" button and a small recap of your imminent order will appear on the screen. 
        You can confirm or reject it.
        That's it. Inside your package you will receive the "Shipment label" to give the product back at the end of the rent.
        If you have any problems you can contact our customer service or the renter himself at any time!
        <br></br> <br></br>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
    <Accordion.Header >How to send back a product</Accordion.Header>
        <Accordion.Body>
        When the rental period expires you have 3 days to send back the product. 
        It is your responsibility that the product is well packaged so as not to be damaged in transit. 
        You will find the shipment label inside the package.
        Once he arrives at his destination, the renter will have 2 days to report any problems, and if everything will be fine 
        the deposit will be returned
        to you.
        <br></br> <br></br>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
    <Accordion.Header >How to manage known sizes</Accordion.Header>
        <Accordion.Body >
        Don't feel like wasting time looking for your perfect size? No problem, in our app you can go to the "Account" section 
        and you will find a "Handle known sizes" button. You can comfortably view the sizes already entered for your favorite 
        brands and you can add others, in order to immediately view the perfect products for you in the list of suggested
        products in each category.
        <br></br> <br></br>
        For any further problems see our <a href="https://www.youtube.com/watch?v=drJ5njTsj7c"> video tutorial</a>.
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header >How to make a return in case of problems</Accordion.Header>
        <Accordion.Body>
          <p>
       For any problems with your rent you can anytime ask for the return of the product.
       The status of the order must be "Arrived".
       All you have to do is to navigate to your "My Rents" page, easily accessible through the bottom navigation bar.
       Here all your orders will appear.
       After choosing the order that you want to return you have two possibilities:
       </p>
       <p>
        - you can contact the renter pressing the button "Contact the renter", show your problem and make a deal with him. 
          In this case he will unlock the "Return Procedure" in advance and you can make a deal with him for shipment costs;
        </p>
        <p>
        - you can contact the Customer Service pressing the button "Contact customer service", show your problem and if the operator recognizes the same problem (you have to give photos or
          an accurate description of the problems) you have the "Return Procedure" unlocked in advance. If the customer service deems that the return is due to an error by the renter, the shipping costs 
          will be credited to his account. Otherwise they will be at your expense. 
          </p>
          <p>
       By pressing the "Return Procedure" button, unlocked by the renter or by the customer service, you can finally print the return label to attach to the product you want to return back.
       When the product arrives at destination, you will obtain a refund.
       </p>
       <br></br> <br></br>
  
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header >Our terms</Accordion.Header>
        <Accordion.Body>
          <p>
        The platform Dress&Go is managed and hosted by Dress&Go INC.a company registered in Torino, with a business location at Politecnico di Torino. 
        These Terms and Conditions (“Terms”) are a legally binding agreement between you and Dress&Go regarding your access and use of the App. 
        </p>
        
        BY ACCESSING OR USING THE APP, YOU CONFIRM THAT YOU ACCEPT THESE TERMS AND THAT YOU AGREE TO COMPLY WITH THEM AND BE LEGALLY BOUND BY THEM.
        
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header >Payments</Accordion.Header>
        <Accordion.Body>
        After pressing the Rent button, you’ll be able to choose the payment method for your order. 
        We accept Visa, MasterCard, Apple Pay or Google Pay.
        <br></br> <br></br>
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header >Shipments</Accordion.Header>
        <Accordion.Body>
        The cost of shipping is borne by the customer who rents the goods. The price is fixed for each type of shipment at 9.99 €.
        There are two shipping methods available. Home delivery through UPS and Service point delivery. 
        <br></br> <br></br>
        </Accordion.Body>
 </Accordion.Item>
 <Accordion.Item eventKey="7">
    <Accordion.Header >Deposit for renting</Accordion.Header>
        <Accordion.Body>
        At the time of rental, a 5% surcharge will be added to the total price as a deposit in case of problems. This amount will be returned at the end of the rental if the goods are still in excellent condition but otherwise it will be retained to cover the damage.
        </Accordion.Body>
 </Accordion.Item>
 <Accordion.Item eventKey="8">
    <Accordion.Header >Order Status</Accordion.Header>
        <Accordion.Body>
        The order status can be:
        <br></br>
        - Arriving: your rental has been confirmed and the package is on your way!
        <br></br>
        - Arrived: your package arrived and you can ask for a return in case of problems (you can follow the relative guide above).
        <br></br>
        - Returning: your return's request has been accepted and you have to send back the package.
        <br></br>
        - Returned: your return's package arrived and you will receive the refund if everything is fine.
        <br></br>
        - Coming back: your rental is terminated, you will receive back the deposit of 5% of the price when the renter will receive the package and verify it.
        <br></br>
        - Closed: your rental is closed and everything was fine.
        </Accordion.Body>
 </Accordion.Item>
</Accordion>

<Row className="justify-content-center pt-3">
<p style={{ textAlign: "center" }}> <b>Did you find what you were looking for? <br></br> If not you can 
contact our customer service</b>!   </p>
<Link  className="my-1 mb-1 btn btn-secondary btn-md w-75 justify-content-center" role="button" to="/CustomerServiceChat"  >
Contact customer service
</Link>

</Row>

</>

);
}