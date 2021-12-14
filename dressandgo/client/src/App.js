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

//TODO: aggiustare quando i suggested sono vuoti -> le scritte si overlappano

/*
STATES:
home
cat
bigcat
*/


/** page: man, woman, unisex */
function App() {
  const [currentState, setCurrentState] = useState("home")
  const [currentCat, setCurrentCat] = useState("");
  const [currentDress, setCurrentDress] = useState("");
  const [page, setPage] = useState("unisex");
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
  const [user, setUser] = useState([
    {
      name: "Patrizio",
      surname: "de Girolamo",
      gender: "male",
      knownSizes: [
      {"brand": "Gucci"
      [{"type": "top", "size": "M"}, {"type": "shoes", "size": "44"}]},

      {"brand": "Levis"
      [{"type": "bottom", "size": "42"}]},
        
      {"brand": "Timberland"
      [{"type": "shoes", "size": "45"}, {"type": "bottom", "size": "44"}]},
    ]


    }
  ])
  const [categories, setCategories] = useState([
    {
      name: "Jackets",
      gender: "unisex",
      address: "https://previews.123rf.com/images/ironsv/ironsv2003/ironsv200300150/142462351-jacket-icon-clothes-icon-vector-on-background-.jpg"
    },

    {
      name: "Shoes",
      gender: "unisex",
      address: "https://w7.pngwing.com/pngs/732/999/png-transparent-air-jordan-nike-air-max-shoe-sneakers-nike-white-outdoor-shoe-sneakers.png"
    },

    {
      name: "Tshirts",
      gender: "unisex",
      address: "https://cdn-icons-png.flaticon.com/512/4267/4267723.png"
    },

    {
      name: "Trousers",
      gender: "unisex",
      address: "https://findicons.com/files/icons/2770/ios_7_icons/512/trousers.png"
    },

    {
      name: "Skirts",
      gender: "woman",
      address: "http://cdn.onlinewebfonts.com/svg/img_471806.png"
    }
  ])

  //gender: man, woman, unisex
  const [ads, setAds] = useState(
    [
      {
        id: 0,
        name: "green jacket",
        cat: "Jackets",
        brand: "Gucci",
        description: "beautiful green jacket",
        price: "23.07",
        type: "top",
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
        type: "top",
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
        type: "shoes",
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
        type: "top",
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
        type: "bottom",
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
        type: "bottom",
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
          if (page == "unisex")
            return ad.name.includes(search) || ad.description.includes(search)
          return ad.gender == page && (ad.name.includes(search) || ad.description.includes(search))
        })}
          handleChangeForwardPage={handleChangeForwardPage}>
        </MyDressList> : <MyCategoryList categories={categories.filter(c => {
          if (page == "unisex") {
            return c
          }
          else if (page == "man" || page == "woman") {
            if (c.gender == "unisex" || c.gender == page)
              return c
          }
        })} ads={ads}
          handleChangeForwardPage={handleChangeForwardPage}
        />}
      </>} />

      <Route path="/dresses/:categorie" element={<>
        {search ? <MyDressList ads={ads.filter(ad => (ad.cat == currentCat) && (ad.name.includes(search) || ad.description.includes(search)))}
          handleChangeForwardPage={handleChangeForwardPage}>
        </MyDressList> : <>
          <Container>
            suggested for you:
            <MyDressList ads={ads.filter(ad => {
              /**
              const brands = user.knownSizes.map(k => k.brand);
              //se il capo è contenuto nei brand conosciuti dallo user controlla la taglia
              if (brands.includes(ad.brand)) {
                
              }
               */

              return;
            }
            )}
              handleChangeForwardPage={handleChangeForwardPage}>
            </MyDressList>
          </Container>


          <Container>
            All sizes:
            <MyDressList ads={ads.filter(ad => {
              if(ad.cat === currentCat){
                if(page == "unisex")
                  return ad;
                else{
                  if(ad.gender == "unisex")
                  return ad;
                else if(ad.gender == page)
                  return ad;
                }
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
