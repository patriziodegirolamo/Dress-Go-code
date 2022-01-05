import './App.css';
import { Row, Container, Button, Col } from "react-bootstrap";
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
import { MyBigAdvertisement } from './mycomponents/dress_card.js'
import Faq from './mycomponents/accordion.js'


import {
  getCategories, getUserInfos, getKnownSizes, getAds, getAdsImages, getBrands, getAllUserMessages,
  getUsers, getConversations, modifyUsInfos, insertKnownSize, removeKnownSize, insertMessage,
  getOperators, getConversationsCS, getAllUserMessagesCS, insertMessageCS
} from './API';

import ChatMessages from './mycomponents/ChatMessages';
import ChatsPage from './mycomponents/ChatsPage';
import { insertConversation } from './API.js'
import { propTypes } from 'react-bootstrap/esm/Image';
import OrderSummary from './mycomponents/order_summary';
import MyRents from './mycomponents/my_rents';
import CSMessages from './mycomponents/ChatMessageCS';

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
    dataIn: "23/12/2022",
    dataOut: "02/01/2023",
    status: "ARRIVING",
    total: 456
  },

  {
    id_r: 4,
    id_a: 2,
    idRenter: 2,
    idBooker: 4,
    dataIn: "01/01/2022",
    dataOut: "13/02/2022",
    status: "PASSED",
    total: 456
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

  const [historyStack, setHistoryStack] = useState(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        const hs = localStorage.getItem("historyStack");
        if (hs !== "[]")
          return JSON.parse(hs);
        else return [];
      }
      else {
        return []
      }

    }

  });

  const [currentCat, setCurrentCat] = useState(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        const cc = localStorage.getItem("currentCat");
        if (cc)
          return cc;
        else return "";
      }
    }
    const urlArray = window.location.pathname.split("/").splice(1)
    if (urlArray[0] === "dresses")
      return urlArray[1]
    else return "";
  });
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");

  const [messages, setMessages] = useState([])
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

  const [operatorsCS, setOperatorsCS] = useState([]);
  const [conversationsCS, setConversationsCS] = useState([]);
  const [messagesCS, setMessagesCS] = useState([]);
  const [contactCS, setContactCS] = useState(false);

  const [dirty, setDirty] = useState(true);

  const handleChangeForwardPage = (cat) => {
    let x = null;
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
      x = JSON.stringify([...historyStack, "bigCat"]);
      setHistoryStack(() => ([...historyStack, "bigCat"]));
      localStorage.setItem("historyStack", x)
    }

    else {
      if (currentState === "home") {
        setCurrentCat(cat)
        localStorage.setItem("currentCat", cat)

        setCurrentState("cat")
        localStorage.setItem("currentState", "cat");


        x = JSON.stringify([...historyStack, "cat"]);
        setHistoryStack(() => ([...historyStack, "cat"]));
        localStorage.setItem("historyStack", x)

      }

      else if (currentState === "cat") {
        setCurrentState("bigCat")
        localStorage.setItem("currentState", "bigCat");

        x = JSON.stringify([...historyStack, "bigCat"]);
        setHistoryStack(() => ([...historyStack, "bigCat"]));
        localStorage.setItem("historyStack", x)

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

      //TODO: AGGIUNGERE I RENTS

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


  useEffect(() => {
    async function getCS() {
      if (user) {
        const fetchedOperators = await getOperators();
        const fetchedConversationsCS = await getConversationsCS(user.id_u);
        const fetchedMessagesCS = await getAllUserMessagesCS(user.id_u);

        setOperatorsCS(fetchedOperators);
        setConversationsCS(fetchedConversationsCS);
        setMessagesCS(fetchedMessagesCS);
        setContactCS(false);
      }
    }
    getCS();
  }, [contactCS]);


  /* TO INSERT A NEW KNOWN SIZE*/
  const addASize = (new_size) => {
    insertKnownSize(new_size).then((err) => { });
    // to avoid another call to the db
    setKnownSizes(knownsizes => {
      return knownsizes.concat(new_size)
    });
  }

  const addAMessageCS = (new_message) => {
    insertMessageCS(new_message).then((err) => { });
    // to avoid another call to the db
    setContactCS(true);
    setMessages(messages => {
      return messages.concat(new_message)
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
      const fullNewConv = { ...new_conversation, id_conv: res.id_conv }
      const fullNewMsg = { ...new_message, id_m: res.id_m }

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

  const filterSuggestedDresses = (ad) => {
    const cat = categories.find(el => el.id_cat === ad.id_cat)
    if (ad.gender === page && cat.name === currentCat) {
      for (const ks of knownsizes) {
        const ksCat = categories.find((el) => el.id_cat === ks.id_cat)
        if (cat.id_cat === ksCat.id_cat && ad.brand === ks.brand && ad.size === ks.EUsize)
          return ad

      }
    }
  }

  const filterAllDresses = (ad) => {
    if (categories.find((el) => el.id_cat === ad.id_cat).name === currentCat) {
      if (ad.gender === "unisex")
        return ad;
      else if (ad.gender === page)
        return ad;
    }
  }

  return <Router>
    <MyHeader page={page} setPage={setPage}
      currentCat={currentCat}
      setCurrentCat={setCurrentCat}
      currentState={currentState}
      setCurrentState={setCurrentState}
      search={search} setSearch={setSearch}
      historyStack={historyStack}
      setHistoryStack={setHistoryStack}

    />

    <Routes >


      <Route path='/ad/:idAd' element={<>
        <MyBigAdvertisement ads={ads} adsImages={adsImages} users={users} currentUser={user}
          conversations={conversations} rents={rents}
          addAConversation={addAConversation} currentCat={currentCat}
          setHistoryStack={setHistoryStack} historyStack={historyStack} setCurrentCat={setCurrentCat} setCurrentState={setCurrentState} />
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

      <Route path='/CustomerServiceChat' element={<>
        {conversationsCS.length > 0 ? <CSMessages
          operatorsCS={operatorsCS}
          user={user}
          conversationsCS={conversationsCS}
          addAMessageCS={addAMessageCS}
          messagesCS={messagesCS.sort((a, b) => a.date - b.date)}
          addAMessageCS={addAMessageCS}
        >
        </CSMessages> : <></>}

      </>
      } />

      <Route path='/MyChats' element={<>
        <ChatsPage currentUser={user} conversations={conversations} users={users} ads={ads}
          adsImages={adsImages} messages={messages.sort((a, b) => a.date - b.date)}
          setMessages={setMessages} conversationsCS={conversationsCS}
          messagesCS={messagesCS.sort((a, b) => a.date - b.date)}
          setCurrentState={setCurrentState}
          historyStack={historyStack} setHistoryStack={setHistoryStack} />
      </>} />

      <Route path="/MyRents" element={<>
        <MyRents user={user} rents={rents} ads={ads} setCurrentState={setCurrentState}
          setHistoryStack={setHistoryStack} historyStack={historyStack} />
      </>} />

      <Route path='/MyRents/:id_r' element={<>
        {
          ads.length > 0 && rents.length ?
            <OrderSummary rents={rents} ads={ads} adsImages={adsImages} conversations={conversations}
              addAConversation={addAConversation} setCurrentState={setCurrentState}
              setHistoryStack={setHistoryStack} historyStack={historyStack} />
            : <></>
        }
      </>
      } />

      <Route path='/previews' element={<>
        {search ? <Container id="dressContainer">
          <h4>RESULTS:</h4>
          <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => {
            return ad.gender === page && (ad.title.includes(search) || ad.description.includes(search))
          })}
            handleChangeForwardPage={handleChangeForwardPage}>
          </MyDressList>
        </Container> :

          <>
            <Container>
              <Row className="pt-3">
                <h3 style={{ textAlign: "center" }}>Category</h3>
              </Row>
              <Row>
                <p style={{ textAlign: "center" }}>Choose a category to find the perfect dress for you.</p>
              </Row>

            </Container>

            <MyCategoryList categories={categories.filter(c => {
              if (c.gender === "unisex" || c.gender === page)
                return c
            })} ads={ads}
              handleChangeForwardPage={handleChangeForwardPage}
            />
          </>}
      </>} />


      <Route path="/dresses/:categorie" element={<>
        {search ? <Container id="dressContainer">
          <h4>RESULTS:</h4>
          <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => (
            categories.find((el) => el.id_cat === ad.id_cat).name === currentCat)
            && (ad.title.includes(search) || ad.description.includes(search)))}
            handleChangeForwardPage={handleChangeForwardPage}>
          </MyDressList>
        </Container>
          :
          <>
            <Container >
              <Row className="pt-3">
                <Col className="text-center mx-auto my-auto">
                  You are watching
                  <h1>{currentCat}</h1>
                </Col>
                <Col>
                  {categories.length > 0 && currentCat ? <img src={"/" + categories.find(x => x.name === currentCat).address} className="img-fluid" id="rotationimage" alt="Responsive image" width="120"></img> : <></>}
                </Col>
              </Row>
            </Container>

            {ads.filter(filterSuggestedDresses).length > 0 ? <Container id="dressContainer">
              <h4>SUGGESTED:</h4>
              <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(filterSuggestedDresses)}
                handleChangeForwardPage={handleChangeForwardPage}>
              </MyDressList>
            </Container> : <></>}


            {ads.filter(filterAllDresses).length > 0 ? <Container id="dressContainer">
              <h4>ALL SIZES:</h4>
              <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(filterAllDresses)}
                handleChangeForwardPage={handleChangeForwardPage}>
              </MyDressList>
            </Container> : <></>}



          </>
        }
      </>} />

      <Route path="/MyAccount" element={<>
        <MyProfile user={user} setCurrentState={setCurrentState}
          setHistoryStack={setHistoryStack} historyStack={historyStack} />
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

      <Route path="/FAQ" element={<>
        <Faq />;
      </>} />

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >

    <FixedBottomNavigation setCurrentState={setCurrentState} setPage={setPage}
      setCurrentCat={setCurrentCat}
      setHistoryStack={setHistoryStack}
      setSearch={setSearch}
    />
  </Router>
}

export default App;
