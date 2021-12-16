import './App.css';
import { Col, Row, Container, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list';
import MyHeader from './mycomponents/header.js';
import MyDressList from './mycomponents/dress_list.js';
import MyProfile from './mycomponents/profile';
import MyUserData from './mycomponents/user_data_profile';
import MyKnownSizes from './mycomponents/known_sizes';
import AddKnownSizes from './mycomponents/add_size_button';
import MyAvailabilityModal from './mycomponents/availabilityModal';
import SizeGuide from './mycomponents/mySizeGuide';
import { MySmallAdvertisement, MyBigAdvertisement } from './mycomponents/dress_card.js'

import { getCategories, getUserInfos, getKnownSizes, getAds, getAdsImages, modifyUsInfos, insertKnownSize, removeKnownSize } from './API';


function App() {
  const [page, setPage] = useState("");
  const [categories, setCategories] = useState([]);
  const [knownsizes, setKnownSizes] = useState([]);
  const [ads, setAds] = useState([]);
  const [adsImages, setAdsImages] = useState([]);
  const [currentState, setCurrentState] = useState("home")
  const [currentCat, setCurrentCat] = useState("");
  const [currentDress, setCurrentDress] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});



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

  useEffect(() => {
    async function getCat() {
      const fetchedCategories = await getCategories();
      const fetchedSizes = await getKnownSizes();
      const fetchedAds = await getAds();
      const fetchedUser = await getUserInfos();
      const fetchedAdsImages = await getAdsImages();
      setCategories(fetchedCategories);
      setKnownSizes(fetchedSizes);
      setAds(fetchedAds);
      setUser(fetchedUser);
      setPage(fetchedUser.gender)
      setAdsImages(fetchedAdsImages);
    }
    getCat();
  }, []);


  /* TO INSERT A NEW KNOWN SIZE*/
  const addASize = (new_size) => {
    insertKnownSize(new_size).then((err) => { });
    // to avoid another call to the db
    setKnownSizes(knownsizes => {
      return knownsizes.concat(new_size)
    });
  }

  /* TO REMOVE A KNOWN SIZE INSERTED BY THE USER */
  const removeASize = (id_ks) => {
    removeKnownSize(id_ks).then((err) => { });
    // to avoid another call to the db
    const cont_ks = knownsizes.indexOf(knownsizes.find((ks) => ks.id_ks === id_ks));

    setKnownSizes(knownsizes => {
      return knownsizes.filter(
        (ks, j) => cont_ks !== j);
    });

  }


  /* TO MODIFY USER INFOS */
  const modifyUserInfos = (newInfos) => {
    modifyUsInfos(newInfos).then((err) => { });
    // to avoid another call to the db 
    setUser({
      id_u: newInfos.id_u, name: newInfos.name, surname: newInfos.surname, address: newInfos.address,
      city: newInfos.city, cap: newInfos.cap, state: newInfos.state, zip: newInfos.zip,
      gender: newInfos.gender, height: newInfos.height, weight: newInfos.weight, waistline: newInfos.waistline,
      hips: newInfos.hips, legLength: newInfos.legLength, shoesNumber: newInfos.shoesNumber
    })
  }



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

      <Route path='/guide' element={<>
        <SizeGuide />
      </>} />

      <Route path='/previews' element={<>
        {search ? <Container id="dressContainer">
          researched:
          <MyDressList ads={ads.filter(ad => {
            return ad.gender == page && (ad.title.includes(search) || ad.description.includes(search))
          })}
            handleChangeForwardPage={handleChangeForwardPage}>
          </MyDressList>
        </Container> : <MyCategoryList categories={categories.filter(c => {

          if (c.gender == "unisex" || c.gender == page)
            return c
        })} ads={ads}
          handleChangeForwardPage={handleChangeForwardPage}
        />}
      </>} />

      <Route path="/dresses/:categorie" element={<>
        {search ? <Container id="dressContainer"> resarched:
          <MyDressList ads={ads.filter(ad => (ad.cat == currentCat) && (ad.title.includes(search) || ad.description.includes(search)))}
            handleChangeForwardPage={handleChangeForwardPage}>
          </MyDressList>
        </Container>
          :
          <>
            <Container id="dressContainer">
              suggested for you:
              <MyDressList ads={ads.filter(ad => {
                if (ad.gender === page && ad.cat === currentCat) {
                  for (const ks of knownsizes) {
                    if (ad.gender == ks.gender && ad.brand == ks.brand && ad.cat == ks.cat && ad.size == ks.EUsize)
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
        <MyProfile user={user} />
      </>} />

      <Route path="/handleknownsizes" element={<>
        <MyKnownSizes knownsizes={knownsizes} setKnownsizes={setKnownSizes} categories={categories} removeASize={removeASize}></MyKnownSizes>
        <Row className="p-3 justify-content-center m-auto ">
          <Button className="mb-3" variant="primary" type="submit" onClick={() => setModalShow(true)}>
            Add known size</Button>
        </Row>

        <AddKnownSizes
          show={modalShow}
          categories={categories}
          addASize={addASize}
          user={user}
          onHide={() => setModalShow(false)}
        />
      </>} />

      <Route path="/editprofile" element={<>
        <MyUserData user={user} modifyUserInfos={modifyUserInfos} />
      </>} />

      <Route path="/paymentmethods" element={<>
        <MyProfile user={user} />
      </>} />

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >
    
    <FixedBottomNavigation setCurrentState={setCurrentState} setPage={setPage}
      setCurrentCat={setCurrentCat} setCurrentDress={setCurrentDress} />
  </Router>
}

export default App;
