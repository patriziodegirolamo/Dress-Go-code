import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { Col, Row, Container, Button } from "react-bootstrap";

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list.js';
import MyHeader from './mycomponents/header.js'
import MyDressList from './mycomponents/dress_list.js';
import MyProfile from './mycomponents/profile';
import MyUserData from './mycomponents/user_data_profile';
import MyKnownSizes from './mycomponents/known_sizes';
import AddKnownSizes from './mycomponents/add_size_button';



import {MySmallAdvertisement, MyBigAdvertisement} from './mycomponents/dress_card.js'



function App() {
  const [currentCat, setCurrentCat] = useState("");
  const [currentDress, setCurrentDress] = useState("");
  const [page, setPage] = useState("all");
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});


  const handleChangeCurrentCategorie = (cat) => setCurrentCat(cat);

  const [knownsizes, setKnownsizes] = useState([
    {
      id: 0,
      brand: "Gucci",
      category: "T-shirts",
      size:"M"
    },

    {
      id: 1,
      brand: "Prada",
      category: "T-shirts",
      size:"S"
    },

    {
      id: 2,
      brand: "Balenciaga",
      category: "Trousers",
      size:"44"
    },

    {
      id: 3,
      brand: "Philippe Model",
      category: "Shoes",
      size:"42"
    },

    {
      id: 4,
      brand: "Golden Goose",
      category: "Shoes",
      size:"42.5"
    }
  ])


  const [categories, setCategories] = useState([
    {
      name: "Jackets",
      address: "https://previews.123rf.com/images/ironsv/ironsv2003/ironsv200300150/142462351-jacket-icon-clothes-icon-vector-on-background-.jpg"
    },

    {
      name: "Shoes",
      address: "https://www.seekpng.com/png/detail/82-821232_png-file-pair-of-shoes-icon.png"
    },

    {
      name: "Tshirts",
      address: "https://cdn-icons-png.flaticon.com/512/4267/4267723.png"
    },

    {
      name: "Trousers",
      address: "https://findicons.com/files/icons/2770/ios_7_icons/512/trousers.png"
    },

    {
      name: "Skirts",
      address: "http://cdn.onlinewebfonts.com/svg/img_471806.png"
    }
  ])

  const [ads, setAds] = useState(
    [
      {
        id: 0,
        name: "green jacket",
        cat: "Jackets",
        description: "beautiful green jacket",
        price: "23.07",
        size: "M",
        address: "https://www.calibroshop.it/storage/immagini/d6ab39f5bc07f8bc00df0b17de696b03.jpeg"
      },

      {
        id: 1,
        name: "black jacket",
        cat: "Jackets",
        description: "beautiful black jacket",
        price: "22.07",
        size: "L",
        address: "https://image.shutterstock.com/image-photo/blank-jacket-bomber-baseball-satin-260nw-1109179079.jpg"
      },

      {
        id: 2,
        name: "black shoes",
        cat: "Shoes",
        description: "beautiful pair of black shoes",
        price: "5.07",
        size: "42",
        address: "https://martinvalen.com/15192-home_default/uomo-basse-sneakers-scarpe-nero.jpg"
      },

      {
        id: 3,
        name: "white t-shirt",
        cat: "Tshirts",
        description: "beautiful white t-shirt",
        price: "1.07",
        size: "M",
        address: "https://m.media-amazon.com/images/I/81XWYTTfBkL._AC_UX679_.jpg"
      },

      {
        id: 4,
        name: "black trousers",
        cat: "Trousers",
        description: "beautiful black trousers",
        price: "32.37",
        size: "40",
        address: "https://images.sportsdirect.com/images/products/36206203_l.jpg"
      },

      {
        id: 5,
        name: "red skirt",
        cat: "Skirts",
        description: "beautiful red skirt",
        price: "12.00",
        size: "38",
        address: "https://www.rinascimento.com/media/catalog/product/cache/c03ae629b2d1553220f68bf2c378cc64/g/o/gonna-midi-in-raso-strutturato-color-nero-6-cfc0106280003b001_list_1.jpg"
      },
    ]
  )

  return <Router>
    <MyHeader page={page} setPage={setPage} currentCat={currentCat}
      handleChangeCurrentCategorie={handleChangeCurrentCategorie} />

    <Routes >

    
      <Route path='/ad/:idAd' element={<>
      <MyBigAdvertisement />
      </>}/>

      <Route path='/previews' element={<>
        <MyCategoryList categories={categories} ads={ads}
          handleChangeCurrentCategorie={handleChangeCurrentCategorie} />
      </>} />

      <Route path="/dresses/:categorie" element={<>
        <MyDressList ads={ads.filter(ad => ad.cat === currentCat)}>
        </MyDressList>
      </>} />

      <Route path="/MyAccount" element={<>
        <MyProfile/>
      </>} />

      <Route path="/handleknownsizes" element={<>
        <MyKnownSizes knownsizes={knownsizes} setKnownsizes={setKnownsizes} ></MyKnownSizes>
        <Row className="p-3 justify-content-center m-auto ">
          <Button className="mb-3" variant="primary" type="submit" onClick={() => setModalShow(true)}>
          Add known size</Button>
        </Row>

        <AddKnownSizes
          show={modalShow}
          setKnownsizes={setKnownsizes}
          knownsizes={knownsizes}
          onHide={() => setModalShow(false)}
        />
      </>} />

      <Route path="/editprofile" element={<>
        <MyUserData/>
      </>} />

      <Route path="/paymentmethods" element={<>
        <MyProfile/>
      </>} />
  


      <Route  path="/" element={<Navigate to="/previews" />} />
    </Routes >



  







    <FixedBottomNavigation />


  </Router>

}

export default App;
