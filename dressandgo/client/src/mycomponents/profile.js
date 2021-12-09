import { Col, Row, Container, Card } from "react-bootstrap";
import "../css/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Da MODIFICARE IL DB DEGLI ABITI
function MyProfile(props) {

    return (
    
            <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div class="card p-4">
            <div class=" image d-flex flex-column justify-content-center align-items-center"> <button class="btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button> <span class="name mt-3">Andrea Birdwhistle</span> <span class="idd">@andrew19</span>
            <div class="d-flex flex-row justify-content-center align-items-center mt-3"> <span class="number">1069 <span class="follow">Following</span></span> </div>
            <div class=" d-flex mt-2"> <button class="btn1 btn-dark">Edit Profile</button> </div>
            <div class="text mt-3"> <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork. Artist/ Creative Director by Day #NFT minting@ with FND night. </span> </div>
            <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i class="fa fa-twitter"></i></span> <span><i class="fa fa-facebook-f"></i></span> <span><i class="fa fa-instagram"></i></span> <span><i class="fa fa-linkedin"></i></span> </div>
            <div class=" px-2 rounded mt-4 date "> <span class="join">Joined May,2021</span> </div>
            </div>
            </div>
            </div>
            
    );
}
export default MyProfile;