import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import FixedBottomNavigation from './mycomponents/bottombar.js'
import MyCategoryList from './mycomponents/category_list';
import MyHeader from './mycomponents/header.js'


/*
Categories: Jackets, Shoes

Jackets: Red, White, Green
Shoes: High_heels, Sneakers, Boots

Gli altri jackets non servono a nulla
*/


function App() {
  const [page, setPage] = useState("all");

  //dirty === true --> faccio una get dei dati dal server
  const [dirty, setDirty] = useState(true);

  const [categories, getCategories] = useState([
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

  const [dresses, getDresses] = useState(
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

  /*
  useEffect(() => {
    const getQuestionari = async () => {

      //se è loggato --> richiedo questionari, relative domande e compilazioni
      if (loggedIn) {
        try {
          const fetchedQuestionari = await API.getAllQuestionari()
          const fetchedDomande = await API.getAllDomande();
          const fetchedCompilazioni = await API.getAllCompilazioni();

          setQuestionari(fetchedQuestionari);
          setDomande(fetchedDomande);
          setRisposteUser(fetchedCompilazioni);

          setDirty(false);
          setLoading(false);

        }
        catch (err) {
          setMessage("Ci dispiace ma il servizio non è al momento disponibile, riprovare più tardi");
        }

      }

      //altrimenti richiedo solo questionari e relative domande
      else {
        try {
          const fetchedQuestionari = await API.getAllQuestionari()
          const fetchedDomande = await API.getAllDomande();

          setQuestionari(fetchedQuestionari);
          setDomande(fetchedDomande);

          setDirty(false);
          setLoading(false);

        }
        catch (err) {
          setMessage("Ci dispiace ma il servizio non è al momento disponibile, riprovare più tardi");
        }

      }

      //clean up
      return () => {
        setQuestionari([]);
        setDomande([]);
        setRisposteUser([]);
        setMessage("");
      };
    }

    if (dirty) {
      getQuestionari();
    }
  }, [dirty]);
*/
  return <Router>
    <MyHeader page={page} setPage={setPage} />

    {/** Quando implementeremo le API 
    <Routes >

      <Route path='/previews' render={() => {
        <MyCategoryList></MyCategoryList>
      }}>
      </Route>
      
      <Route path="/" element={<Navigate to ="/home/previews"/>}/>
    </Routes >
    */}

    <MyCategoryList categories={categories} dresses={dresses}></MyCategoryList>
    <FixedBottomNavigation />


  </Router>

}

export default App;
