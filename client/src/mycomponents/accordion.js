import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import YoutubeEmbed from "./youtubeEmbed";


const stopAllVideos = () => {
    return
}


export default function Faq(){
return(

<Accordion>
<Container>
        <Row className="pt-2">
          <h3 style={{ textAlign: "center" }}>FAQ</h3>
        </Row>

      </Container>


  <Accordion.Item eventKey="0">
    <Accordion.Header onClick={stopAllVideos}>How to order</Accordion.Header>
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
        For any further problems see our <a href="https://www.youtube.com/watch?v=drJ5njTsj7c"> video tutorial</a>.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
    <Accordion.Header onClick={stopAllVideos}>How to send back a product</Accordion.Header>
        <Accordion.Body>
        When the rental period expires you have 3 days to send back the product. 
        It is your responsibility that the product is well packaged so as not to be damaged in transit. 
        You will find the shipment label inside the package.
        Once he arrives at his destination, the renter will have 2 days to report any problems, and if everything will be fine 
        the deposit will be returned
        to you.
        <br></br> <br></br>
        For any further problems see our <a href="https://www.youtube.com/watch?v=drJ5njTsj7c"> video tutorial</a>.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
    <Accordion.Header onClick={stopAllVideos}>How to manage known sizes</Accordion.Header>
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
    <Accordion.Header onClick={stopAllVideos}>How to make a return in case of problems</Accordion.Header>
        <Accordion.Body>
          <p>
       For any problems with your rent you can anytime ask for the return of the product.
       All you have to do is to navigate to your "My Rents" page, easily accessible through the bottom navigation bar.
       Here all your orders will appear. 
       After choosing the order that you want to return you have two possibilities:
       </p>
       <p>
        - you can contact the renter pressing the button "Contact the renter", show your problem and make a deal with him. In this case he will unlock the "Return Procedure" in advance;
        </p>
        <p>
        - you can contact the Customer Service pressing the button "Contact customer service", show your problem and if the operator recognizes the same problem (you have to give photos or
          an accurate description of the problems) you have the "Return Procedure" unlocked in advance.
          </p>
       By pressing the "Return Procedure" button, unlocked by the renter or by the customer service, you can finally print the return label to attach to the product you want to return back.
       When the product arrives at destination, you will obtain a refund.
       <br></br> <br></br>
        For any further problems see our <a href="https://www.youtube.com/watch?v=drJ5njTsj7c"> video tutorial</a>.
       <a href="https://www.youtube.com/watch?v=drJ5njTsj7c"> Video Tutorial</a>
          {/**<YoutubeEmbed  embedId="KWEHq5FAmCM" />
        </Container>
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header onClick={stopAllVideos}>Refund policy</Accordion.Header>
        <Accordion.Body>
        In case there are problems with your rent, you can ask for a refund.
        All you have to do is to follow the procedure of 'How to make a Return'.
        You can find the correspondant section here above in the FAQ page.
        After completing this procedure the transaction is blocked and you will have your money back.
        For any further problems see our video
        <Container className="mt-3">
          {/**<YoutubeEmbed  embedId="F6EeZDaa2fM" />*/}
      
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header onClick={stopAllVideos}>Our terms</Accordion.Header>
        <Accordion.Body>
        The platform Dress&Go is managed and hosted by Dress&Go INC.a company registered in Torino, with a business location at Politecnico di Torino. 
        These Terms and Conditions (“Terms”) are a legally binding agreement between you and Dress&Go regarding your access and use of the App. 
        BY ACCESSING OR USING THE App, YOU CONFIRM THAT YOU ACCEPT THESE TERMS AND THAT YOU AGREE TO COMPLY WITH THEM AND BE LEGALLY BOUND BY THEM.
        
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header onClick={stopAllVideos}>Payments</Accordion.Header>
        <Accordion.Body>
        After pressing the Rent button, you’ll be able to choose the payment method for your order. 
        We accept Visa, MasterCard, Apple Pay or Google Pay.
        <br></br> <br></br>
        For any further problems see our <a href="https://www.youtube.com/watch?v=drJ5njTsj7c"> video tutorial</a>.
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header onClick={stopAllVideos}>Shipments</Accordion.Header>
        <Accordion.Body>
        The cost of shipping is borne by the customer who rents the goods. The price is fixed for each type of shipment at 9.99 euros.
        There are two shipping methods available. Home delivery through UPS. Service point delivery. 
        <br></br> <br></br>
        For any further problems see our <a href="https://www.youtube.com/watch?v=drJ5njTsj7c"> video tutorial</a>.
        </Accordion.Body>
 </Accordion.Item>
 <Accordion.Item eventKey="7">
    <Accordion.Header onClick={stopAllVideos}>Deposit for renting</Accordion.Header>
        <Accordion.Body>
        At the time of rental, a 5% surcharge will be added to the total price as a deposit in case of problems. This amount will be returned at the end of the rental if the goods are still in excellent condition but otherwise it will be retained to cover the damage.
        </Accordion.Body>
 </Accordion.Item>
</Accordion>
);
}