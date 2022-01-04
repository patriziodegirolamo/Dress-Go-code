import * as React from 'react';
import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import YoutubeEmbed from "./youtubeEmbed";


const stopAllVideos = () => {
    return
}


export default function Faq(){
return(

<Accordion>
<Container>          
      <b id="title" className="mx-auto ">FAQ</b>
</Container>


  <Accordion.Item eventKey="0">
    <Accordion.Header onClick={stopAllVideos}>How to order</Accordion.Header>
        <Accordion.Body>
        With the Dress & Go app ordering won't be a problem.
        You just have to follow very few and simple steps. 
        Once you have found the t-shirt of your dream for your very special occasion, check if it fits you perfectly using the size guide.
        Then select the starting and ending date of your rent, checking the availability on the calendar.
        A small recap of your imminent order will appear on the screen. Finally press the "Rent" button.
        That's it.
        For any further problems see our video
        <Container className="mt-3">
          <YoutubeEmbed  embedId="ffja9u6MS-s" />
        </Container>
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header onClick={stopAllVideos}>How to make a return</Accordion.Header>
        <Accordion.Body>
       For any problems with your rent you can anytime ask for the return of the product.
       All you have to do is to navigate to your "My Rents" page, easily accessible through the bottom navigation bar.
       Here all yours orders will appear sorted by month. 
       After choosing the order that you want to return you have the possibility to chat with the vendor or contact our customer service.
       Calling our customer service number will directly allows you talk with one of our assistant that will enable you the "Return Product" button.
       By pressing this button you can finally print the return label to attach to the product you want to return back.
       For any further problems see our video
       <Container className="mt-3">
          <YoutubeEmbed  embedId="KWEHq5FAmCM" />
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
          <YoutubeEmbed  embedId="F6EeZDaa2fM" />
        </Container>
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header onClick={stopAllVideos}>Our terms</Accordion.Header>
        <Accordion.Body>
        The platform Dress&Go is managed and hosted by Dress&Go INC.a company registered in Torino, with a business location at Politecnico di Torino. 
        These Terms and Conditions (“Terms”) are a legally binding agreement between you and Dress&Go regarding your access and use of the App. 
        BY ACCESSING OR USING THE App, YOU CONFIRM THAT YOU ACCEPT THESE TERMS AND THAT YOU AGREE TO COMPLY WITH THEM AND BE LEGALLY BOUND BY THEM.
        For any further problems see our video
        <Container className="mt-3">
          <YoutubeEmbed  embedId="nS-13-oxemk" />
        </Container>
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header onClick={stopAllVideos}>Payments</Accordion.Header>
        <Accordion.Body>
        After pressing the Rent button, you’ll be able to choose the payment method for your order. 
        We accept Visa, MasterCard, Apple Pay or Google Pay.
        For any further problems see our video
        <Container className="mt-3">
          <YoutubeEmbed  embedId="PUVmX986ZDA" />
        </Container>
        </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header onClick={stopAllVideos}>Shipments</Accordion.Header>
        <Accordion.Body>
        Renters select their preferred shipping option at checkout and cover the corresponding shipping costs. 
        There are three shipping methods available. Home delivery through UPS. Service point delivery.
        Meet-up option. 
        <Container className="mt-3">
          <YoutubeEmbed  embedId="Aqn2rK9pP9g" />
        </Container>
        </Accordion.Body>
 </Accordion.Item>
</Accordion>
);
}