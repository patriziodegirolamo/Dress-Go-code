import './App.css';
import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list';
import MyHeader from './mycomponents/header.js'


function App() {
  return (
    <>
    <MyHeader/>
    <FixedBottomNavigation/>
    <MyCategoryList></MyCategoryList>
    </>
   
  );
}

export default App;
