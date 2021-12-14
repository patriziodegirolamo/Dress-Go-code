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
import {MySmallAdvertisement, MyBigAdvertisement} from './mycomponents/dress_card.js'

import {getCategories, getUserInfos, getKnownSizes, getAds, getAdsImages, modifyUsInfos, insertKnownSize} from './API';





function App() {
  const [page, setPage] = useState("all");
  const [categories, setCategories] = useState([]);
  const [knownsizes, setKnownSizes] = useState([]);
  const [ads, setAds] = useState([]);
  const [adsImages, setAdsImages] = useState([]);

  const [currentCat, setCurrentCat] = useState("");
  const [currentDress, setCurrentDress] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});


  const handleChangeCurrentCategorie = (cat) => setCurrentCat(cat);

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
      setAdsImages(fetchedAdsImages);
    }
    getCat();
  }, []);


    /* TO CREATE A JOIN REQUEST FOR A STUDY GROUP */
    const addASize = () => {
      const size = {id_u: 1, brand: "Bershka", eusize: "38"};
      insertKnownSize(size).then((err) => {});
  }

  /* TO MODIFY USER INFOS */
  const modifyUserInfos = (newInfos) => {
    console.log('MODIFY')
    console.log(newInfos);
    modifyUsInfos(newInfos).then((err) => {});
    // to avoid another call to the db 
    setUser({id_u: newInfos.id_u, name: newInfos.name, surname: newInfos.surname, address: newInfos.address,
      city: newInfos.city, cap: newInfos.cap, state: newInfos.state, zip: newInfos.zip, 
      gender: newInfos.gender, height: newInfos.height, weight: newInfos.weight, waistline: newInfos.waistline,
      hips: newInfos.hips, legLength: newInfos.legLength, shoesNumber: newInfos.shoesNumber})
  }
 
  return <Router>
  <MyHeader page={page} setPage={setPage} currentCat={currentCat}
    handleChangeCurrentCategorie={handleChangeCurrentCategorie} />

  <Routes >

  
    <Route path='/ad/:idAd' element={<>
    <MyBigAdvertisement ads = {ads}/>
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
      <MyProfile user = {user}/>
    </>} />

    <Route path="/handleknownsizes" element={<>
      <MyKnownSizes knownsizes={knownsizes} setKnownsizes={setKnownSizes} categories = {categories}></MyKnownSizes>
      <Row className="p-3 justify-content-center m-auto ">
        <Button className="mb-3" variant="primary" type="submit" onClick={() => setModalShow(true)}>
        Add known size</Button>
      </Row>

      <AddKnownSizes
        show={modalShow}
        setKnownsizes={setKnownSizes}
        knownsizes={knownsizes}
        onHide={() => setModalShow(false)}
      />
    </>} />

    <Route path="/editprofile" element={<>
      <MyUserData user = {user} modifyUserInfos={modifyUserInfos}/>
    </>} />

    <Route path="/paymentmethods" element={<>
      <MyProfile user = {user}/>
    </>} />

    <Route  path="/" element={<Navigate to="/previews" />} />
  </Routes >
  <FixedBottomNavigation />
</Router>
}

export default App;
