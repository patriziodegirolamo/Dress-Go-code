import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list';
import MyHeader from './mycomponents/header.js'

import getCategories from './API';



function App() {
  const [page, setPage] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCat() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    getCat();
  }, []);

 
  return <Router>
    <MyHeader page={page} setPage={setPage} />

    <Routes >

      <Route path='/previews' element={<MyCategoryList categories={categories} />} />
      
      {/**NON riesco ad ottenere come params --> categorie: problema con react router dom versione 6 */}
      <Route path="/dresses/:categorie"/>

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >

    <FixedBottomNavigation />


  </Router>

}

export default App;
