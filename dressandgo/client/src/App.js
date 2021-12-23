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

import { getCategories, getUserInfos, getKnownSizes, getAds, getAdsImages, getBrands, 
         getUsers, getConversations, modifyUsInfos, insertKnownSize, removeKnownSize, insertMessage } from './API';

import ChatMessages from './mycomponents/ChatMessages';
import ChatsPage from './mycomponents/ChatsPage';
import {insertConversation} from './API.js'


const fakeRents = [
  {
    id_r: 1,
    id_a: 2,
    idRenter: 2,
    idBooker: 1,
    dataIn: "15/03/2022",
    dataOut: "18/03/2022"
  },

  {
    id_r: 2,
    id_a: 2,
    idRenter: 2,
    idBooker: 1,
    dataIn: "15/05/2022",
    dataOut: "18/05/2022"
  },

  {
    id_r: 3,
    id_a: 2,
    idRenter: 2,
    idBooker: 3,
    dataIn: "15/04/2022",
    dataOut: "18/04/2022"
  },

]

/**
const fakeMessages = [
  {
    id_mess: 1,
    id_r: 1,
    id_a: 2,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "ciao mi chiamo Patrizio de Girolamo"
  },

  {
    id_mess: 2,
    id_r: 1,
    id_a: 2,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "Vorrei"
  },

  {
    id_mess: 3,
    id_r: 1,
    id_a: 2,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "Sapere",
  },

  {
    id_mess: 4,
    id_r: 1,
    id_a: 2,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "Quando",
  },

  {
    id_mess: 5,
    id_r: 1,
    id_a: 2,
    idSender: 1,
    idReceiver: 2,
    date: new Date().toISOString(),
    text: "E' disponibile",
  },

  {
    id_mess: 6,
    id_r: 1,
    id_a: 2,
    idSender: 2,
    idReceiver: 1,
    date: new Date().toISOString(),
    text: "ciao E' disponibile sin da subito",
  }
]
 */

function App() {
  const [page, setPage] = useState("");
  const [categories, setCategories] = useState([]);
  const [knownsizes, setKnownSizes] = useState([]);
  const [ads, setAds] = useState([]);
  const [adsImages, setAdsImages] = useState([]);
  const [brands, setBrands] = useState([]);

  const [currentState, setCurrentState] = useState("home")
  const [currentCat, setCurrentCat] = useState("");
  const [currentDress, setCurrentDress] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  
  const [messages, setMessages] = useState([])
  const [rents, setRents] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({});

  const [conversations, setConversations] = useState([]); //tutte le conversazioni dell'utente loggato

  
  
  const handleChangeForwardPage = (cat) => {
    if (search) {
      if (currentState === "home") {
        setCurrentCat(cat)
        setCurrentState("bigCat");
      }
      else if (currentState === "cat") {
        setCurrentState("bigCat")
      }
    }

    else {
      if (currentState === "home") {
        setCurrentCat(cat)
        setCurrentState("cat")
      }

      else if (currentState === "cat") {
        setCurrentState("bigCat")
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
      const fetchedUser = await getUserInfos();
      const fetchedAdsImages = await getAdsImages();
      const fetchedBrands = await getBrands();
      const fetchedUsers = await getUsers();
      const fetchedConversations = await getConversations(fetchedUser.id_u);

      setCategories(fetchedCategories);
      setKnownSizes(fetchedSizes);
      setAds(fetchedAds);
      setUser(fetchedUser);
      setPage(fetchedUser.gender)
      setAdsImages(fetchedAdsImages);
      setBrands(fetchedBrands);
      setUsers(fetchedUsers);
      setConversations(fetchedConversations);
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

  
  const addAConversation = (new_conversation) => {
    insertConversation(new_conversation).then((err) => { });;

    //.then(insertMessage(new_message))
    // to avoid another call to the db
    setConversations(conversations => conversations.concat(new_conversation))
    //setMessages(messages => messages.concat(new_message))
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
        addAConversation={addAConversation}/>
      </>} />

      <Route path='/guide' element={<>
        <SizeGuide />
      </>} />

      <Route path='/MyChats/:id_a/:id_r' element={<></>}/>
      {/**
      <Route path='/MyChats/:id_a/:id_r' element={<ChatMessages user={user} messages={messages} rents={rents}>
      </ChatMessages>}/>
 */}
      <Route path='/MyChats' element={<>
        <ChatsPage currentUser={user} conversations={conversations} rents={rents} users={users} ads={ads} 
        adsImages={adsImages} messages={messages.sort((a,b) => a.date - b.date)}/>
      </>} />

      <Route path='/previews' element={<>
        {search ? <Container id="dressContainer">
          researched:
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
        {search ? <Container id="dressContainer"> resarched:
          <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => (categories.find((el) => el.id_cat === ad.id_cat).name === currentCat) && (ad.title.includes(search) || ad.description.includes(search)))}
            handleChangeForwardPage={handleChangeForwardPage}>
          </MyDressList>
        </Container>
          :
          <>
            <Container id="dressContainer">
              suggested for you:
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
              All sizes:
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
