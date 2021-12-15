import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Col, Row, Container, Button } from "react-bootstrap";

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list.js';
import MyHeader from './mycomponents/header.js'
import MyDressList from './mycomponents/dress_list.js';
import { MySmallAdvertisement, MyBigAdvertisement } from './mycomponents/dress_card.js'
import MyAvailabilityModal from './mycomponents/availabilityModal';


/*
STATES:
home
cat
bigcat
*/


/** page: man, woman */
function App() {
  const user = {
    name: "Patrizio",
    surname: "de Girolamo",
    gender: "man",
  }

  const [currentState, setCurrentState] = useState("home")
  const [currentCat, setCurrentCat] = useState("");
  const [currentDress, setCurrentDress] = useState("");
  const [page, setPage] = useState(user.gender);
  const [search, setSearch] = useState("");



  const handleChangeForwardPage = (cat) => {
    if (search) {
      if (currentState == "home") {
        setCurrentCat(cat)
        setCurrentState("bigCat");
      }
      else if (currentState == "cat") {
        setCurrentState("bigCat")
      }
    }

    else {
      if (currentState == "home") {
        setCurrentCat(cat)
        setCurrentState("cat")
      }

      else if (currentState == "cat") {
        setCurrentState("bigCat")
      }

      else if (currentState == "bigCat") {

      }
    }

  };

  /**type: 
   * top: XS-XXL, 
   * bottom: 30-50, 
   * shoes: 30-50 
   * */


  const [knownSizes, setKnownSizes] = useState([
    {
      brand: "Gucci",
      cat: "Jackets",
      gender: "man",
      size: "M",

    },

    /*
    {
      brand: "Gucci",
      cat: "Shoes",
      gender: "man",
      size: "44"
    },

    {
      brand: "Levis",
      cat: "Trousers",
      gender: "unisex",
      size: "42"
    },

    {
      brand: "Timberland",
      cat: "Shoes",
      gender: "man",
      size: "45"
    },
    */
    {
      brand: "Timberland",
      cat: "Trousers",
      size: "44",
      gender: "woman",

    }
  ])
  const [categories, setCategories] = useState([
    {
      name: "Jackets",
      gender: "unisex",
      address: "jacket.png"
    },

    {
      name: "Shoes",
      gender: "woman",
      address: "high-heels.png"
    },

    {
      name: "Shoes",
      gender: "man",
      address: "sneakers.png"
    },

    {
      name: "Shirt",
      gender: "unisex",
      address: "hawaiian-shirt.png"
    },

    {
      name: "Pajamas",
      gender: "man",
      address: "pajamas.png"
    },

    {
      name: "Skirt",
      gender: "woman",
      address: "skirt.png"
    },

    {
      name: "Socks",
      gender: "woman",
      address: "socksfemale.png"
    },

    {
      name: "Socks",
      gender: "man",
      address: "socksmale.png"
    },

    {
      name: "Watch",
      gender: "unisex",
      address: "wristwatch.png"
    },

    {
      name: "Tshirt",
      gender: "unisex",
      address: "t-shirt.png"
    },

    {
      name: "trousers",
      gender: "unisex",
      address: "trousers.png"
    },

    {
      name: "suit",
      gender: "man",
      address: "suit.png"
    },

    {
      name: "dress",
      gender: "woman",
      address: "dress.png"
    }

  ])

  //gender: man, woman
  const [ads, setAds] = useState(
    [
      {
        id: 0,
        name: "green jacket",
        cat: "Jackets",
        brand: "Gucci",
        description: "beautiful green jacket",
        price: "23.07",
        size: "M",
        gender: "man",
        addresses: ["https://www.calibroshop.it/storage/immagini/d6ab39f5bc07f8bc00df0b17de696b03.jpeg",
          "https://www.calibroshop.it/storage/immagini/d6ab39f5bc07f8bc00df0b17de696b03.jpeg",
          "https://www.calibroshop.it/storage/immagini/d6ab39f5bc07f8bc00df0b17de696b03.jpeg"
        ]
      },

      {
        id: 1,
        name: "black jacket",
        cat: "Jackets",
        brand: "Armani",
        description: "beautiful black jacket",
        price: "22.07",
        size: "L",
        gender: "man",
        addresses: ["https://image.shutterstock.com/image-photo/blank-jacket-bomber-baseball-satin-260nw-1109179079.jpg",
          "https://image.shutterstock.com/image-photo/blank-jacket-bomber-baseball-satin-260nw-1109179079.jpg"]
      },

      {
        id: 2,
        name: "black shoes",
        cat: "Shoes",
        brand: "Gucci",
        description: "beautiful pair of black shoes",
        price: "5.07",
        size: "42",
        gender: "man",
        addresses: ["https://png.pngtree.com/png-clipart/20210613/original/pngtree-leather-shoes-black-accessories-clothing-png-image_6403650.jpg",
          "https://png.pngtree.com/png-clipart/20210613/original/pngtree-leather-shoes-black-accessories-clothing-png-image_6403650.jpg",
          "https://png.pngtree.com/png-clipart/20210613/original/pngtree-leather-shoes-black-accessories-clothing-png-image_6403650.jpg",
          "https://png.pngtree.com/png-clipart/20210613/original/pngtree-leather-shoes-black-accessories-clothing-png-image_6403650.jpg"]
      },

      {
        id: 3,
        name: "white t-shirt",
        cat: "Tshirts",
        brand: "Nike",
        description: "beautiful white t-shirt",
        price: "1.07",
        size: "M",
        gender: "unisex",
        addresses: ["https://m.media-amazon.com/images/I/81XWYTTfBkL._AC_UX679_.jpg",
          "https://m.media-amazon.com/images/I/81XWYTTfBkL._AC_UX679_.jpg"]
      },

      {
        id: 4,
        name: "black trousers",
        cat: "Trousers",
        brand: "Gucci",
        description: "beautiful black trousers",
        price: "32.37",
        size: "40",
        gender: "man",
        addresses: ["https://images.sportsdirect.com/images/products/36206203_l.jpg"]
      },

      {
        id: 5,
        name: "red skirt",
        cat: "Skirts",
        brand: "Gucci",
        description: "beautiful red skirt",
        price: "12.00",
        size: "36",
        gender: "woman",
        addresses: ["https://www.rinascimento.com/media/catalog/product/cache/c03ae629b2d1553220f68bf2c378cc64/g/o/gonna-midi-in-raso-strutturato-color-nero-6-cfc0106280003b001_list_1.jpg",
          "https://www.rinascimento.com/media/catalog/product/cache/c03ae629b2d1553220f68bf2c378cc64/g/o/gonna-midi-in-raso-strutturato-color-nero-6-cfc0106280003b001_list_1.jpg"]
      },
    ]
  )


  return <Router>

    <MyHeader page={page} setPage={setPage}
      currentCat={currentCat}
      setCurrentCat={setCurrentCat}
      currentState={currentState}
      setCurrentState={setCurrentState}
      search={search} setSearch={setSearch}
    />

    <Routes >
      <Route path='/ad/:idAd' element={<>
        <MyBigAdvertisement ads={ads} />
      </>} />

      <Route path='/previews' element={<>
        {search ? <MyDressList ads={ads.filter(ad => {
          return ad.gender == page && (ad.name.includes(search) || ad.description.includes(search))
        })}
          handleChangeForwardPage={handleChangeForwardPage}>
        </MyDressList> : <MyCategoryList categories={categories.filter(c => {

          if (c.gender == "unisex" || c.gender == page)
            return c
        })} ads={ads}
          handleChangeForwardPage={handleChangeForwardPage}
        />}
      </>} />

      <Route path="/dresses/:categorie" element={<>
        {search ? <MyDressList ads={ads.filter(ad => (ad.cat == currentCat) && (ad.name.includes(search) || ad.description.includes(search)))}
          handleChangeForwardPage={handleChangeForwardPage}>
        </MyDressList> : <>
          <Container id="dressContainer">
            
            suggested for you:
            <MyDressList ads={ads.filter(ad => {
              if(ad.gender === page && ad.cat === currentCat){
                for (const ks of knownSizes) {
                  if (ad.gender == ks.gender && ad.brand == ks.brand && ad.cat == ks.cat && ad.size == ks.size)
                    return ad
                }
              }
            }
            )}
              handleChangeForwardPage={handleChangeForwardPage}>
            </MyDressList>
          </Container>


          <Container id="dressContainer">
            All sizes:
            <MyDressList ads={ads.filter(ad => {
              if (ad.cat === currentCat) {
                if (ad.gender == "unisex")
                  return ad;
                else if (ad.gender == page)
                  return ad;
              }
            })}
              handleChangeForwardPage={handleChangeForwardPage}>
            </MyDressList>
          </Container>
        </>
        }
      </>} />

      <Route path="/MyAccount" element={<>

      </>} />

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >


    <FixedBottomNavigation setCurrentState={setCurrentState} setPage={setPage}
      setCurrentCat={setCurrentCat} setCurrentDress={setCurrentDress} />


  </Router>

}

export default App;
