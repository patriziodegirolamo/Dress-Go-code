'use strict';

/*
s287565 --> password1 --> general admin
s242022 --> password2 --> general admin 
s232221 --> password3
s252627 --> password4
s292929 --> password5

SG A --> Web Application I (s242022, s232221 group admin)
SG B --> Software Engineering (s232221, s252627 group admin)
*/

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const dao = require('./DAO'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions

// init express
const app = new express(); // FIXME: should we use new?
const PORT = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());



/*** DressAndGo APIs ***/

// GET /api/allcategories ; to have the list of all the categories
app.get("/api/allcategories", async (req, res) => {
  try {
    const result = await dao.listCategories();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/userInfo ; to have the infos about the user logged
app.get("/api/userInfo", async (req, res) => {
  const id_u = 1;
  try {
    const result = await dao.userInfos(id_u);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/knownsizes ; to have the list of all the categories
app.get("/api/knownsizes", async (req, res) => {
  const id_u = 1;
  try {
    const result = await dao.listKnownSizes(id_u);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/allads ; to have the list of all ads
app.get("/api/allads", async (req, res) => {
  try {
    const result = await dao.listAds();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/alladsimages ; to have the list of all ads images
app.get("/api/alladsimages", async (req, res) => {
  try {
    const result = await dao.listAdsImages();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/allbrands ; to have the list of all brands
app.get("/api/allbrands", async (req, res) => {
  try {
    const result = await dao.listBrands();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/allusers ; to have the list of all users
app.get("/api/allusers", async (req, res) => {
  try {
    const result = await dao.listUsers();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/allconversations ; to have the list of all conversations
app.get("/api/allconversations", async (req, res) => {
  try {
    const result = await dao.listConversations(req.query.id_u);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/allrents ; to have the list of all rents
app.get("/api/allrents", async (req, res) => {
  try {
    const result = await dao.listRents(req.query.id_u);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/allmessages ; to have the list of all messages
/**
app.get("/api/allmessages", async (req, res) => {
  try {
    const result = await dao.listMessages(req.query.id_conv);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});
 */

// GET /api/allmessages ; to have the list of all messages
app.get("/api/allUsermessages", async (req, res) => {
  try {
    const result = await dao.listAllUserMessages(req.query.id_u);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});


// POST /api/newknownsize ; to create a new known size for that user
app.post('/api/newknownsize',
  async (req, res) => {
    const ksize = { id_u: req.body.id_u, brand: req.body.brand, id_cat: req.body.id_cat, eusize: req.body.eusize };
    try {
      const result = await dao.insertKnownSize(ksize);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });


// POST /api/newconversation ; to create a new conversation
app.post('/api/newconversation',
  async (req, res) => {
    const conv = { id_a: req.body.id_a, idRenter: req.body.idRenter, idBooker: req.body.idBooker };
    const newMess = {
      idSender: req.body.idSender, idReceiver: req.body.idReceiver,
      date: req.body.date, text: req.body.text
    }

    try {
      const result = await dao.insertConversation(conv).then((id_conv) => {
        const messaggio = { ...newMess, id_conv: id_conv }
        const r = dao.insertMessage(messaggio).then(id_m => { return { id_conv: id_conv, id_m: id_m } })
        return r;
      });
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });


// POST /api/newmessage ; to create a new message
app.post('/api/newmessage',
  async (req, res) => {
    const msg = { id_conv: req.body.id_conv, idSender: req.body.idSender, idReceiver: req.body.idReceiver, date: req.body.date, text: req.body.text };
    try {
      const result = await dao.insertMessage(msg);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });

// POST /api/newrent ; to create a new rent
app.post('/api/newrent',
  async (req, res) => {
    const rent = { id_a: req.body.id_a, id_renter: req.body.id_renter, id_booker: req.body.id_booker, dataIn: req.body.dataIn, dataOut: req.body.dataOut, status: req.body.status };
    try {
      const result = await dao.insertRent(rent);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });

// PATCH /api/modifyUserInfo ; to update user infos
app.patch('/api/modifyUserInfo',
  async (req, res) => {
    const newInfos = {
      id_u: req.body.id_u, name: req.body.name, surname: req.body.surname, address: req.body.address,
      city: req.body.city, cap: req.body.cap, state: req.body.state, zip: req.body.zip,
      gender: req.body.gender, height: req.body.height, weight: req.body.weight, waistline: req.body.waistline,
      hips: req.body.hips, legLength: req.body.legLength, shoesNumber: req.body.shoesNumber
    };
    try {
      const result = await dao.modifyUserInfos(newInfos);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });

// PATCH /api/modifyStatusRent ; to update a status of a rent 
app.patch('/api/modifyStatusRent',
  async (req, res) => {
    const newStatus = { id_r: req.body.id_r, status: req.body.status };
    try {
      const result = await dao.modifyStatusRent(newStatus);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });

  
// PATCH /api/unlockReturn ; to unlock the return procedure of a rent 
app.patch('/api/unlockReturn',
async (req, res) => {
  const newLock = { id_r: req.body.id_r, value: "UNLOCKED" };
  try {
    const result = await dao.unlockReturn(newLock);
    return res.json(result);
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of submission` });
  }
});



// DELETE /api/removeksize ; to remove a knwon size inserted by the user
app.delete('/api/removeksize', async (req, res) => {
  try {
    await dao.removeKnownSize(req.query.id_ks);
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});




app.get("/api/alloperators", async (req, res) => {
  try {
    const result = await dao.listOperators();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/allconversations ; to have the list of all conversations
app.get("/api/allconversationsCS", async (req, res) => {
  try {
    const result = await dao.listConversationsCS(req.query.id_u);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});


app.get("/api/allUsermessagesCS", async (req, res) => {
  try {
    const result = await dao.listAllUserMessagesCS(req.query.id_u);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});



// POST /api/newmessage ; to create a new message
app.post('/api/newmessageCS',
  async (req, res) => {
    const msg = { id_conv: req.body.id_conv, idUser: req.body.idUser, idCS: req.body.idCS, date: req.body.date, text: req.body.text, isSenderAUser: req.body.isSenderAUser };
    try {
      const result = await dao.insertMessageCS(msg);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));