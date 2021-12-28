import './App.css';
import { Row, Container, Button } from "react-bootstrap";
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
import Faq from './mycomponents/accordion.js'


import {
  getCategories, getUserInfos, getKnownSizes, getAds, getAdsImages, getBrands, getAllUserMessages,
  getUsers, getConversations, modifyUsInfos, insertKnownSize, removeKnownSize, insertMessage, getMessages
} from './API';

import ChatMessages from './mycomponents/ChatMessages';
import ChatsPage from './mycomponents/ChatsPage';
import { insertConversation } from './API.js'
import { propTypes } from 'react-bootstrap/esm/Image';
import OrderSummary from './mycomponents/order_summary';
import MyRents from './mycomponents/my_rents';

const fakeRents = [
  {
    id_r: 1,
    id_a: 2,
    idRenter: 2,
    idBooker: 1,
    dataIn: "15/03/2022",
    dataOut: "18/03/2022",
    status: "PASSED",
    total: 456
  },

  {
    id_r: 2,
    id_a: 3,
    idRenter: 2,
    idBooker: 1,
    dataIn: "15/05/2022",
    dataOut: "18/05/2022",
    status: "ARRIVING",
    total: 456
  },

  {
    id_r: 3,
    id_a: 2,
    idRenter: 2,
    idBooker: 3,
    dataIn: "15/04/2022",
    dataOut: "18/04/2022",
    status: "ARRIVING",
    total: 456
  },

]

const fakeConversations = [
  {
    id_conv: 1,
    id_a: 1,
    idRenter: 2,
    idBooker: 1,
  },

  {
    id_conv: 2,
    id_a: 2,
    idRenter: 2,
    idBooker: 1
  },

  {
    id_conv: 3,
    id_a: 3,
    idRenter: 3,
    idBooker: 2
  }
]

const fakeMessages = [
  {
    id_mess: 1,
    id_conv: 1,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "ciao mi chiamo Patrizio de Girolamo"
  },

  {
    id_mess: 2,
    id_conv: 1,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "Vorrei"
  },

  {
    id_mess: 3,
    id_conv: 1,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "Sapere",
  },

  {
    id_mess: 4,
    id_conv: 1,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "Quando",
  },

  {
    id_mess: 5,
    id_conv: 1,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "E' disponibile",
  },

  {
    id_mess: 6,
    id_conv: 1,
    idSender: 2,
    idReceiver: 1,
    date: new Date().toISOString(),
    text: "ciao E' disponibile sin da subito",
  },

]


function App() {

  const [page, setPage] = useState(() => {
    const p = localStorage.getItem("page");
    if (p)
      return p;
    else return "";
  });

  const [categories, setCategories] = useState([]);
  const [knownsizes, setKnownSizes] = useState([]);
  const [ads, setAds] = useState([]);
  const [adsImages, setAdsImages] = useState([]);
  const [currentState, setCurrentState] = useState(() => {
    const cs = localStorage.getItem("currentState");
    if (cs)
      return cs;
    else return "home";
  });

  const [currentCat, setCurrentCat] = useState(() => {
    const cc = localStorage.getItem("currentCat");
    if (cc)
      return cc;
    else return "";
  });

  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");

  const [messages, setMessages] = useState([...fakeMessages])
  const [rents, setRents] = useState([...fakeRents])
  const [users, setUsers] = useState([])

  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    const newObj = {}
    if (u)
      return JSON.parse(u);
    else return newObj;
  });

  const [conversations, setConversations] = useState([]); //tutte le conversazioni dell'utente loggato

  const [brands, setBrands] = useState([]);

  const [dirty, setDirty] = useState(true);

  const handleChangeForwardPage = (cat) => {
    if (search) {
      if (currentState === "home") {
        setCurrentCat(cat)
        localStorage.setItem("currentCat", cat)

        setCurrentState("bigCat");
        localStorage.setItem("currentState", "bigCat");
      }
      else if (currentState === "cat") {
        setCurrentState("bigCat")
        localStorage.setItem("currentState", "bigCat");
      }
    }

    else {
      if (currentState === "home") {
        setCurrentCat(cat)
        localStorage.setItem("currentCat", cat)

        setCurrentState("cat")
        localStorage.setItem("currentState", "cat");
      }

      else if (currentState === "cat") {
        setCurrentState("bigCat")
        localStorage.setItem("currentState", "bigCat");

      }

      else if (currentState === "bigCat") {

      }
    }

  };

  useEffect(() => {
    async function getCat() {
      const fetchedCategories = await getCategories();
      const fetchedSizes = await getKnownSizes();
      const fetchedAds = await getAds();

      const fetchedAdsImages = await getAdsImages();
      const fetchedBrands = await getBrands();
      const fetchedUsers = await getUsers();

      let fetchedUser = null;
      let fetchedConversations;
      let fetchedMessages;
      
      if (Object.keys(user).length === 0) {
        fetchedUser = await getUserInfos();
        fetchedConversations = await getConversations(fetchedUser.id_u);
        fetchedMessages = await getAllUserMessages(fetchedUser.id_u);
        localStorage.setItem("user", JSON.stringify(fetchedUser));
        localStorage.setItem("page", fetchedUser.gender);
        setPage(fetchedUser.gender);

      }
      else {
        fetchedUser = JSON.parse(localStorage.getItem("user"));
        fetchedConversations = await getConversations(fetchedUser.id_u);
        fetchedMessages = await getAllUserMessages(fetchedUser.id_u);
        setPage(localStorage.getItem("page"));

      }

      setUser(fetchedUser);

      setMessages(fetchedMessages);
      setCategories(fetchedCategories);
      setKnownSizes(fetchedSizes);
      setAds(fetchedAds);
      setAdsImages(fetchedAdsImages);
      setUsers(fetchedUsers);
      setConversations(fetchedConversations);
      setBrands(fetchedBrands);
      setDirty(false);
    }
    getCat();
  }, [dirty]);


  /* TO INSERT A NEW KNOWN SIZE*/
  const addASize = (new_size) => {
    insertKnownSize(new_size).then((err) => { });
    // to avoid another call to the db
    setKnownSizes(knownsizes => {
      return knownsizes.concat(new_size)
    });
  }


  const addAMessage = (new_message) => {
    insertMessage(new_message).then((err) => { });
    // to avoid another call to the db
    setMessages(messages => {
      return messages.concat(new_message)
    });
  }
  

  const addAConversation = (new_conversation, new_message) => {
    
    return insertConversation(new_conversation, new_message).then((res) => { 
      const fullNewConv =  {...new_conversation, id_conv: res.id_conv}
      const fullNewMsg = {...new_message, id_m: res.id_m}

      setConversations([...conversations, fullNewConv])
      setMessages([...messages, fullNewMsg])
      setDirty(true);
      return res
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
        <MyBigAdvertisement ads={ads} adsImages={adsImages} users={users} currentUser={user}
          conversations={conversations}
          addAConversation={addAConversation} />
      </>} />

      <Route path='/guide' element={<>
        <SizeGuide />
      </>} />

      <Route path='/MyChats/:id_conv' element={<ChatMessages user={user}
        messages={messages.sort((a, b) => a.date - b.date)} users={users}
        conversations={conversations} adsImages={adsImages}
        addAMessage={addAMessage} ads={ads}
      >
      </ChatMessages>} />

      <Route path='/MyChats' element={<>
        <ChatsPage currentUser={user} conversations={conversations} users={users} ads={ads}
          adsImages={adsImages} messages={messages.sort((a, b) => a.date - b.date)}
          setMessages={setMessages} />
      </>} />

      <Route path="/MyRents" element={<>
        <MyRents user={user} rents={rents} ads={ads}/>
      </>} />

      <Route path='/MyRents/:id_r' element={<>
        <OrderSummary rents={rents} ads={ads} adsImages={adsImages} conversations={conversations}
        addAConversation={addAConversation}/>
      </>} />

      <Route path='/previews' element={<>
        {search ? <Container id="dressContainer">
          <h4>researched:</h4>
          <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => {
            return ad.gender === page && (ad.title.includes(search) || ad.description.includes(search))
          })}
            handleChangeForwardPage={handleChangeForwardPage}>
          </MyDressList>
        </Container> : <MyCategoryList categories={categories.filter(c => {
          if (c.gender === "unisex" || c.gender === page)
            return c
        })} ads={ads}
          handleChangeForwardPage={handleChangeForwardPage}
        />}
      </>} />

      <Route path="/dresses/:categorie" element={<>
        {search ? <Container id="dressContainer"> 
        <h4>researched:</h4>
          <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => (categories.find((el) => el.id_cat === ad.id_cat).name === currentCat) && (ad.title.includes(search) || ad.description.includes(search)))}
            handleChangeForwardPage={handleChangeForwardPage}>
          </MyDressList>
        </Container>
          :
          <>
            <Container id="dressContainer">
              <h4>suggested for you:</h4>
              <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => {
                if (ad.gender === page && categories.find((el) => el.id_cat === ad.id_cat).name === currentCat) {
                  for (const ks of knownsizes) {
                    if (ad.gender === ks.gender && ad.brand === ks.brand &&
                      categories.find((el) => el.id_cat === ad.id_cat).name === categories.find((el) => el.id_cat === ks.id_cat).name &&
                      ad.size === ks.EUsize)
                      return ad
                  }
                }
              }
              )}
                handleChangeForwardPage={handleChangeForwardPage}>
              </MyDressList>
            </Container>


            <Container id="dressContainer">
            <h4>All sizes:</h4>
              <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => {
                if (categories.find((el) => el.id_cat === ad.id_cat).name === currentCat) {
                  if (ad.gender === "unisex")
                    return ad;
                  else if (ad.gender === page)
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
          brands={brands}
          onHide={() => setModalShow(false)}
        />
      </>} />

      <Route path="/editprofile" element={<>
        <MyUserData user={user} modifyUserInfos={modifyUserInfos} />
      </>} />

      <Route path="/paymentmethods" element={<>
        <MyProfile user={user} />
      </>} />

      <Route path="/FAQ" element={<>
        <Faq/>;
      </>}/>

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >

    <FixedBottomNavigation setCurrentState={setCurrentState} setPage={setPage}
      setCurrentCat={setCurrentCat}/>
  </Router>
}

export default App;
