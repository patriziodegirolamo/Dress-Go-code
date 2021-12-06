import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list';
import MyHeader from './mycomponents/header.js'



function App() {
  const [page, setPage] = useState("man")
  return <Router>
    <MyHeader page={page} setPage={setPage} />

    {/** Quando implementeremo le API 
    <Routes >

      <Route path='/home/previews' render={() => {
        <MyCategoryList></MyCategoryList>
      }}>
      </Route>
      
      <Route path="/" element={<Navigate to ="/home/previews"/>}/>
    </Routes >
    */}

    <MyCategoryList></MyCategoryList>
    <FixedBottomNavigation />


  </Router>

}

export default App;
