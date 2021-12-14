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
import {MySmallAdvertisement, MyBigAdvertisement} from './mycomponents/dress_card.js'

import {getCategories, getUserInfos, getKnownSizes, getAds, insertKnownSize} from './API';



function App() {
  const [page, setPage] = useState("all");
  const [categories, setCategories] = useState([]);
  const [knownsizes, setKnownSizes] = useState([]);
  const [ads, setAds] = useState([]);

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
      setCategories(fetchedCategories);
      setKnownSizes(fetchedSizes);
      setAds(fetchedAds);

      /* prova nuove API */
      const fetchedUser = await getUserInfos();
    }
    getCat();
  }, []);


    /* TO CREATE A JOIN REQUEST FOR A STUDY GROUP */
    const addASize = () => {
      const size = {id_u: 1, brand: "Bershka", eusize: "38"};
      insertKnownSize(size).then((err) => {});
  }
 
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
      <MyKnownSizes knownsizes={knownsizes} setKnownsizes={setKnownSizes} ></MyKnownSizes>
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
