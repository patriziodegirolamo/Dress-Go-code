import './App.css';
import { Row, Container, Button, Col, Spinner, Overlay } from "react-bootstrap";
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, NavLink as Link } from 'react-router-dom';



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
  getUsers, getConversations, modifyUsInfos, modifyStatus, unlockReturn, insertKnownSize, removeKnownSize, insertMessage, insertRent,
  getOperators, getConversationsCS, getAllUserMessagesCS, insertMessageCS, getRents
} from './API';

import ChatMessages from './mycomponents/ChatMessages';
import ChatsPage from './mycomponents/ChatsPage';
import { insertConversation } from './API.js'
import OrderSummary from './mycomponents/order_summary';
import MyRents from './mycomponents/my_rents';
import CSMessages from './mycomponents/ChatMessageCS';


function App() {

  const navigate = useNavigate();

  const url = window.location.href.split("/")
  const diz1 = {
    '': "home",
    "previews": "home",
    "FAQ": "faq",
    "MyRents": "rents",
    "MyChats": "chats",
    "CustomerServiceChat": "chat",
    "MyAccount": "account",
    "editprofile": "editprofile",
    "handleknownsizes": "ks"
  }

  const diz2 = {
    "dresses": "cat",
    "MyRents": "rent",
    "MyChats": "chat",
    "ad": "bigCat",
  }


  const [page, setPage] = useState(() => {
    const p = localStorage.getItem("page");
    if ((url[3] === "" || url[3] === "previews" || url[3] === "dresses" || url[3] === "ad") && p)
      return p;
    else return "";
  });

  const [filterAds, setFilterAds] = useState([]);
  const [filter, setFilter] = useState();

  const [categories, setCategories] = useState([]);
  const [knownsizes, setKnownSizes] = useState([]);
  const [ads, setAds] = useState([]);
  const [adsImages, setAdsImages] = useState([]);
  const [currentState, setCurrentState] = useState(() => {
    const cs = localStorage.getItem("currentState");
    let urlstate;

    if (url.length === 4)
      urlstate = diz1[url[3]]
    else if (url.length === 5)
      urlstate = diz2[url[3]]

    if (cs) {
      if (urlstate !== cs) {
        localStorage.setItem("currentState", urlstate);
        return urlstate;
      }

      else return cs;
    }
    return "home";
  });

  const [historyStack, setHistoryStack] = useState(() => {
    const hs = localStorage.getItem("historyStack");
    if (hs !== "[]")
      return JSON.parse(hs);
    else return [];
  });


  const [currentCat, setCurrentCat] = useState(() => {
    const cc = localStorage.getItem("currentCat")
    if (url[3] === "dresses") {
      localStorage.setItem("currentCat", url[4])
      return url[4]
    }
    else if (cc != url[4]) {
      return cc
    }
    else return "";
  });
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");

  const [messages, setMessages] = useState([]);
  const [rents, setRents] = useState([]);
  const [users, setUsers] = useState([]);

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

  //Overlay
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const target = useRef(null);
  const target1 = useRef(null);

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

  const [backButtonPressed, setBackButtonPressed] = useState(false)

  window.onbeforeunload = function (event) {
    if (sessionStorage.getItem('reloaded') != null) {
    }
    else {
      setHistoryStack([]);
      setCurrentCat("");
      setCurrentState("");

      localStorage.setItem("historyStack", "[]")
      localStorage.setItem("currentCat", "")
      localStorage.setItem("currentState", "")
      localStorage.setItem("currentBottomNav", "0")
    }
    sessionStorage.setItem("reloaded", "1");
  }
  window.onpopstate = function (event) {
    setBackButtonPressed(true)
  }


  useEffect(() => {
    async function getAllLocalStorage() {
      setBackButtonPressed(false)

      if (backButtonPressed) {
        setSearch("")
        let prev = null;
        let curr = null;
        let currParam = JSON.parse(localStorage.getItem("currParam"));

        if (historyStack.length === 0) {
          setCurrentCat("");
          localStorage.setItem("currentCat", "");

          historyStack.pop()
          localStorage.setItem("historyStack", JSON.stringify(historyStack))
          setCurrentState("home")
          navigate("/previews");

        }
        switch (currentState) {

          case "cat":
            setCurrentCat("");
            localStorage.setItem("currentCat", "");

            historyStack.pop()
            localStorage.setItem("historyStack", JSON.stringify(historyStack))
            setCurrentState("home")
            localStorage.setItem("currentState", "home");
            navigate("/previews");
            break;

          case "bigCat":
            prev = historyStack.pop()
            curr = historyStack[historyStack.length - 1]

            if (curr === "cat") {
              setCurrentState(curr);
              localStorage.setItem("historyStack", JSON.stringify(historyStack))
              navigate("dresses/" + currentCat);
            }

            else if (curr === "bigCat") {
              setCurrentState("bigCat");
              localStorage.setItem("currentState", "bigCat");
              setCurrentCat(currParam.cat)
              localStorage.setItem("historyStack", JSON.stringify(historyStack))
              navigate("ad/" + currParam.id);
            }
            else {
              setCurrentState("home");
              setCurrentCat("");

              localStorage.setItem("historyStack", JSON.stringify(historyStack))
              navigate("previews");

            }

            break;

          case "chat":
            prev = historyStack.pop()
            curr = historyStack[historyStack.length - 1]
            if (historyStack.length === 0) {
              if (prev === "chat") {
                setCurrentState("chats");
                localStorage.setItem("currentState", "chat");
                localStorage.setItem("historyStack", JSON.stringify(historyStack))
                navigate("/MyChats");
              }
            }
            else {

              if (curr === "chats") {
                setCurrentState("chats");
                localStorage.setItem("currentState", "chat");
                localStorage.setItem("historyStack", JSON.stringify(historyStack))
                navigate("/MyChats");
              }


              else if (curr === "rent") {
                setCurrentState("rent");
                localStorage.setItem("currentState", "rent");
                localStorage.setItem("historyStack", JSON.stringify(historyStack))
                navigate("MyRents/" + currParam.id);
              }

              else if (curr === "bigCat") {
                setCurrentState("bigCat");
                localStorage.setItem("currentState", "bigCat");
                setCurrentCat(currParam.cat)
                localStorage.setItem("historyStack", JSON.stringify(historyStack))
                navigate("ad/" + currParam.id);
              }
            }


            break;

          case "rent":
            prev = historyStack.pop()
            curr = historyStack[historyStack.length - 1]

            if (prev === "rent") {
              setCurrentState("rents");
              localStorage.setItem("currentState", "rents");
              localStorage.setItem("historyStack", JSON.stringify(historyStack))
              navigate("MyRents");
            }
            if (curr === "bigCat") {
              setCurrentState("bigCat");
              localStorage.setItem("currentState", "bigCat");
              localStorage.setItem("historyStack", JSON.stringify(historyStack))
              navigate("ad/" + currParam.id);
            }
            else if (curr === "rents") {
              setCurrentState("rents");
              localStorage.setItem("currentState", "rent");
              localStorage.setItem("historyStack", JSON.stringify(historyStack))
              navigate("/MyRents");
            }

            break;

          case "editProfile":
            prev = historyStack.pop();
            setCurrentState("account");
            localStorage.setItem("historyStack", "[]")
            localStorage.setItem("currentState", "account");
            navigate("/MyAccount");

            break;

          case "ks":
            prev = historyStack.pop();
            setCurrentState("account");
            localStorage.setItem("historyStack", "[]")
            localStorage.setItem("currentState", "account");
            navigate("/MyAccount");

            break;

          default:
            break;
        }

      }
    }
    getAllLocalStorage();
  }, [backButtonPressed]);


  useEffect(() => {
    async function getCat() {
      const fetchedCategories = await getCategories();
      const fetchedSizes = await getKnownSizes();
      const fetchedAds = await getAds();

      const fetchedAdsImages = await getAdsImages();
      const fetchedBrands = await getBrands();
      const fetchedUsers = await getUsers();

      const fetchedOperators = await getOperators();
      let fetchedConversationsCS;;
      let fetchedMessagesCS;

      let fetchedUser = null;
      let fetchedConversations;
      let fetchedMessages;
      let fetchedRents;

      if (Object.keys(user).length === 0) {
        fetchedUser = await getUserInfos();
        fetchedConversations = await getConversations(fetchedUser.id_u);
        fetchedMessages = await getAllUserMessages(fetchedUser.id_u);
        fetchedRents = await getRents(fetchedUser.id_u)
        fetchedConversationsCS = await getConversationsCS(fetchedUser.id_u);
        fetchedMessagesCS = await getAllUserMessagesCS(fetchedUser.id_u);
        localStorage.setItem("user", JSON.stringify(fetchedUser));
        localStorage.setItem("page", fetchedUser.gender);
        setPage(fetchedUser.gender);
      }

      else {
        fetchedUser = JSON.parse(localStorage.getItem("user"));
        fetchedConversations = await getConversations(fetchedUser.id_u);
        fetchedMessages = await getAllUserMessages(fetchedUser.id_u);
        fetchedRents = await getRents(fetchedUser.id_u);
        fetchedConversationsCS = await getConversationsCS(fetchedUser.id_u);
        fetchedMessagesCS = await getAllUserMessagesCS(fetchedUser.id_u);
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
      setRents(fetchedRents);
      setOperatorsCS(fetchedOperators);
      setConversationsCS(fetchedConversationsCS);
      setMessagesCS(fetchedMessagesCS);
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

  const addARent = (newRent) => {
    insertRent(newRent).then((res) => {
      const completeRent = { ...newRent, id_r: res, return: "LOCKED" }
      setRents(rents => {
        return rents.concat(completeRent)
      });
      return res;
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
    const newUser = {
      id_u: newInfos.id_u, name: newInfos.name, surname: newInfos.surname, address: newInfos.address,
      city: newInfos.city, cap: newInfos.cap, state: newInfos.state, zip: newInfos.zip,
      gender: newInfos.gender, height: newInfos.height, weight: newInfos.weight, waistline: newInfos.waistline,
      hips: newInfos.hips, legLength: newInfos.legLength, shoesNumber: newInfos.shoesNumber
    }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  /* TO UPDATE STATUS OF A RENT  */
  const modifyStatusR = (newStatus) => {
    modifyStatus(newStatus).then((err) => { });
    unlockReturn({ id_r: newStatus.id_r }).then((err) => { });
    // to avoid another call to the db 
    setRents(oldList => {
      const list = oldList.map((item) => {
        if (item.id_r === newStatus.id_r) {
          return {
            id_r: item.id_r, id_a: item.id_a, idRenter: item.idRenter,
            idBooker: item.idBooker, dataIn: item.dataIn, dataOut: item.dataOut, status: newStatus.status, return: item.return
          };
        } else return item;
      });
      return list;
    });
  }

  /* TO UNLOCK A RETURN OF A RENT  */
  const unlockReturnProcedure = (newLock) => {
    unlockReturn({ id_r: newLock.id_r }).then((err) => { });
    // to avoid another call to the db 
    setRents(oldList => {
      const list = oldList.map((item) => {
        if (item.id_r === newLock.id_r) {
          return {
            id_r: item.id_r, id_a: item.id_a, idRenter: item.idRenter,
            idBooker: item.idBooker, dataIn: item.dataIn, dataOut: item.dataOut, status: item.status, return: "UNLOCKED"
          };
        } else return item;
      });
      return list;
    });
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


  return <>
    <MyHeader page={page} setPage={setPage}
      currentCat={currentCat}
      setCurrentCat={setCurrentCat}
      currentState={currentState}
      setCurrentState={setCurrentState}
      search={search} setSearch={setSearch}
      historyStack={historyStack}
      setHistoryStack={setHistoryStack}
      ads={ads} setAds={setAds}
      categories={categories}
      filterAds={filterAds}
      setFilterAds={setFilterAds}
      setFilter={setFilter}
    />

    <Routes >


      <Route path='/ad/:idAd'
        element={<>
          <MyBigAdvertisement ads={ads} adsImages={adsImages} users={users} currentUser={user}
            conversations={conversations} rents={rents}
            addAConversation={addAConversation} currentCat={currentCat}
            setHistoryStack={setHistoryStack} historyStack={historyStack} setCurrentCat={setCurrentCat} setCurrentState={setCurrentState}
            addARent={addARent} setRents={setRents} dirty={dirty} />
        </>} />

      <Route path='/guide' element={<>
        <SizeGuide />
      </>} />

      <Route path='/MyChats/:id_conv' element={<ChatMessages user={user}
        messages={messages.sort((a, b) => a.date - b.date)} users={users}
        conversations={conversations} adsImages={adsImages}
        addAMessage={addAMessage} ads={ads} dirty={dirty}
      >
      </ChatMessages>} />

      <Route path='/CustomerServiceChat' element={<>
        {conversationsCS.length > 0 ? <CSMessages
          operatorsCS={operatorsCS}
          user={user}
          conversationsCS={conversationsCS}
          addAMessageCS={addAMessageCS}
          messagesCS={messagesCS.sort((a, b) => a.date - b.date)}
          dirty={dirty}
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
          historyStack={historyStack} setHistoryStack={setHistoryStack}
          dirty={dirty} contactCS={contactCS} />
      </>} />

      <Route path="/MyRents" element={<>
        <MyRents user={user} rents={rents} ads={ads} adsImages={adsImages} setCurrentState={setCurrentState}
          setHistoryStack={setHistoryStack} historyStack={historyStack} dirty={dirty} />
      </>} />

      <Route path='/MyRents/:id_r' element={<>
        {
          !dirty ?
            <OrderSummary rents={rents} ads={ads} adsImages={adsImages} conversations={conversations}
              addAConversation={addAConversation}
              setCurrentState={setCurrentState}
              setHistoryStack={setHistoryStack} historyStack={historyStack} modifyStatusR={modifyStatusR} unlockReturnProcedure={unlockReturnProcedure}
            />
            : <Container id="containerSpinner">
              <Spinner animation="border" variant="primary" />
            </Container>
        }
      </>
      } />

      <Route path='/previews' element={<>
        {search ? <Container id="dressContainer">
          <h4 id="titlebar">RESULTS IN {page.toUpperCase()} CATEGORY:</h4>
          <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => {
            return ad.gender === page && (ad.title.toLowerCase().includes(search.toLowerCase()))
          })}
            handleChangeForwardPage={handleChangeForwardPage}
            dirty={dirty}>
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
              dirty={dirty}
            />
          </>}
      </>} />


      <Route path="/dresses/:categorie" element={<>
        {search ? <Container id="dressContainer">
          <h4>RESULTS IN {currentCat.toUpperCase()}:</h4>
          <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(ad => (
            categories.find((el) => el.id_cat === ad.id_cat).name === currentCat)
            && ad.title.toLowerCase().includes(search.toLowerCase()))}
            handleChangeForwardPage={handleChangeForwardPage}
            dirty={dirty}>
          </MyDressList>
        </Container>
          :
          <>
            {
              dirty ?
                <Container id="containerSpinner">
                  <Spinner animation="border" variant="primary" />
                </Container> : <>
                  <Container>
                    <Row className="pt-3">
                      <Col className="text-center mx-auto my-auto">
                        You are watching
                        <h1>{currentCat}</h1>
                      </Col>
                      <Col>
                        {categories.find(x => x.name === currentCat && x.gender === page) !== undefined && categories.length > 0 && currentCat ? <img src={"/" + categories.find(x => x.name === currentCat && x.gender === page).address} className="img-fluid" id="rotationimage" alt="Responsive" width="120"></img> : <></>}
                      </Col>
                    </Row>
                  </Container>
                  {ads.filter(filterSuggestedDresses).length > 0 ?

                    filter !== undefined ? (
                      (filterAds === undefined || filterAds.length === 0) ? (
                        <></>
                      ) : (
                        <Container id="dressContainer">
                          <p>Filtering by: {filter}</p>
                          <h4 id="titlebar">

                            <Link ref={target} onClick={() => setShow(!show)} className="" role="button" to="">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg>
                            </Link>


                            &nbsp;SUGGESTED BY YOUR SIZES:


                            <Container>
                              <Overlay target={target.current} show={show} placement="top">
                                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                  <div
                                    {...props}
                                    style={{
                                      backgroundColor: 'rgb(189, 195, 199)',
                                      padding: '2px 10px',
                                      color: 'white',
                                      borderRadius: 3,
                                      ...props.style,
                                    }}
                                  >
                                    Products that may perfect fill to you!
                                  </div>
                                )}
                              </Overlay>
                            </Container>


                          </h4>
                          <MyDressList adsImages={adsImages} categories={categories} ads={filterAds.filter(filterSuggestedDresses)}
                            handleChangeForwardPage={handleChangeForwardPage}
                            dirty={dirty}>
                          </MyDressList>
                        </Container>
                      )
                    ) : (
                      <Container id="dressContainer">
                        <h4 id="titlebar">

                          <Link ref={target} onClick={() => setShow(!show)} className="" role="button" to="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                          </Link>


                          &nbsp;SUGGESTED BY YOUR SIZES:


                          <Container>
                            <Overlay target={target.current} show={show} placement="top">
                              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                <div
                                  {...props}
                                  style={{
                                    backgroundColor: 'rgb(189, 195, 199)',
                                    padding: '2px 10px',
                                    color: 'white',
                                    borderRadius: 3,
                                    ...props.style,
                                  }}
                                >
                                  Products that may perfect fill to you!
                                </div>
                              )}
                            </Overlay>
                          </Container>


                        </h4>
                        <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(filterSuggestedDresses)}
                          handleChangeForwardPage={handleChangeForwardPage}
                          dirty={dirty}>
                        </MyDressList>
                      </Container>
                    )


                    : <></>}

                  {ads.filter(filterAllDresses).length > 0 ?
                    filter !== undefined ? (
                      (filterAds === undefined || filterAds.length === 0) ? (
                        <Container>
                          <h6 classname="mt-40">No products avaliable with this interval of price! You can change the filter or remove it at all.</h6>
                        </Container>
                      ) : (
                        <Container id="dressContainer">
                          <h4 id="titlebar">



                            <Link ref={target1} onClick={() => setShow1(!show1)} className="" role="button" to="">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg>
                            </Link>

                            &nbsp;ALL SIZES:


                            <Container>
                              <Overlay target={target1.current} show={show1} placement="top">
                                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                  <div
                                    {...props}
                                    style={{
                                      backgroundColor: 'rgb(189, 195, 199)',
                                      padding: '2px 10px',
                                      color: 'white',
                                      borderRadius: 3,
                                      ...props.style,
                                    }}
                                  >
                                    Products of all sizes
                                  </div>
                                )}
                              </Overlay>
                            </Container>


                          </h4>

                          <MyDressList adsImages={adsImages} categories={categories} ads={filterAds.filter(filterAllDresses)}
                            handleChangeForwardPage={handleChangeForwardPage}
                            dirty={dirty}>
                          </MyDressList>
                        </Container>
                      )
                    ) : (
                      <Container id="dressContainer">
                        <h4 id="titlebar">



                          <Link ref={target1} onClick={() => setShow1(!show1)} className="" role="button" to="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                          </Link>

                          &nbsp;ALL SIZES:


                          <Container>
                            <Overlay target={target1.current} show={show1} placement="top">
                              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                <div
                                  {...props}
                                  style={{
                                    backgroundColor: 'rgb(189, 195, 199)',
                                    padding: '2px 10px',
                                    color: 'white',
                                    borderRadius: 3,
                                    ...props.style,
                                  }}
                                >
                                  Products of all sizes
                                </div>
                              )}
                            </Overlay>
                          </Container>


                        </h4>
                        <MyDressList adsImages={adsImages} categories={categories} ads={ads.filter(filterAllDresses)}
                          handleChangeForwardPage={handleChangeForwardPage}
                          dirty={dirty}>
                        </MyDressList>
                      </Container>
                    )



                    : <></>}

                </>}

          </>
        }
      </>} />

      <Route path="/MyAccount" element={<>
        {
          dirty ? <Container id="containerSpinner">
            <Spinner animation="border" variant="primary" />
          </Container> : <>
            <MyProfile user={user} setCurrentState={setCurrentState}
              setHistoryStack={setHistoryStack} historyStack={historyStack}
            />
          </>}
      </>} />


      <Route path="/handleknownsizes" element={<>
        {
          dirty ? <Container id="containerSpinner">
            <Spinner animation="border" variant="primary" />
          </Container> : <>

            <MyKnownSizes knownsizes={knownsizes} setKnownsizes={setKnownSizes} categories={categories}
              removeASize={removeASize} />
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
          </>}
      </>} />

      <Route path="/editprofile" element={<>
        {
          dirty ? <Container id="containerSpinner">
            <Spinner animation="border" variant="primary" />
          </Container> : <>
            <MyUserData user={user} modifyUserInfos={modifyUserInfos} setCurrentState={setCurrentState}
              setHistoryStack={setHistoryStack}
            />
          </>}
      </>} />

      <Route path="/FAQ" element={<>
        <Faq />
      </>} />

      <Route path="/" element={<Navigate to="/previews" />} />
    </Routes >

    <FixedBottomNavigation setCurrentState={setCurrentState} setPage={setPage}
      setCurrentCat={setCurrentCat}
      setHistoryStack={setHistoryStack}
      setSearch={setSearch}
    />
  </>
}

export default App;
