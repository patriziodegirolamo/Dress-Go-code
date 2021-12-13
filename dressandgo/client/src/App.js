import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list';
import MyHeader from './mycomponents/header.js'

import {getCategories, getUserInfos, getKnownSizes, insertKnownSize} from './API';



function App() {
  const [page, setPage] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCat() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);

      /* prova nuove API */
      const fetchedUser = await getUserInfos();
      const fetchedSizes = await getKnownSizes();
      console.log(fetchedUser);
      console.log(fetchedSizes);
    }
    getCat();
  }, []);


    /* TO CREATE A JOIN REQUEST FOR A STUDY GROUP */
    const addASize = () => {
      const size = {id_u: 1, brand: "Bershka", eusize: "38"};
      insertKnownSize(size).then((err) => {});
  }
 
  return <Router>
    <MyHeader page={page} setPage={setPage} />

    <Routes >

      <Route path='/previews' element={<MyCategoryList categories={categories} />} />
      
      <Route path="/dresses/:categorie"/>

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >

    <FixedBottomNavigation />


  </Router>

}

export default App;
