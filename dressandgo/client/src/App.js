import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { Col, Row, Container } from "react-bootstrap";

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list';
import MyHeader from './mycomponents/header.js'





function App() {
  const [page, setPage] = useState("all");

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

  const [dresses, setDresses] = useState(
    [
      {
        name: "Jackets",
        addresses: ["https://www.calibroshop.it/storage/immagini/d6ab39f5bc07f8bc00df0b17de696b03.jpeg",
          "https://image.shutterstock.com/image-photo/blank-jacket-bomber-baseball-satin-260nw-1109179079.jpg"],
      },

      {
        name: "Shoes",
        addresses: ["https://martinvalen.com/15192-home_default/uomo-basse-sneakers-scarpe-nero.jpg"],
      },

      {
        name: "Tshirts",
        addresses: ["https://m.media-amazon.com/images/I/81XWYTTfBkL._AC_UX679_.jpg"],
      },

      {
        name: "Trousers",
        addresses: ["https://images.sportsdirect.com/images/products/36206203_l.jpg"],
      },

      {
        name: "Skirts",
        addresses: ["https://www.rinascimento.com/media/catalog/product/cache/c03ae629b2d1553220f68bf2c378cc64/g/o/gonna-midi-in-raso-strutturato-color-nero-6-cfc0106280003b001_list_1.jpg"],
      },
    ]
  )

  return <Router>
    <MyHeader page={page} setPage={setPage} />

    <Routes >

      <Route path='/previews' element={<MyCategoryList />} />
      
      {/**NON riesco ad ottenere come params --> categorie: problema con react router dom versione 6 */}
      <Route path="/dresses/:categorie"/>

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >


    <MyCategoryList categories={categories} dresses={dresses}></MyCategoryList>
    <FixedBottomNavigation />


  </Router>

}

export default App;
