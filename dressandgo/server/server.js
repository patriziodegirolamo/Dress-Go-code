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




// POST /api/newknownsize ; to create a new known size for that user
app.post('/api/newknownsize',
  async (req, res) => {
    const ksize = { id_u: req.body.id_u, brand: req.body.brand, eusize: req.body.eusize};
    try {
      const result = await dao.insertKnownSize(ksize);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });

  // PATCH /api/modifyUserInfo ; to update user infos
  app.patch('/api/modifyUserInfo',
  async (req, res) => {
    const newInfos = { id_u: req.body.id_u, name: req.body.name, surname: req.body.surname, address: req.body.address};
    try {
      const result = await dao.modifyUserInfos(newInfos);
      return res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of submission` });
    }
  });



// DELETE /api/removeksize ; to remove a knwon size inserted by the user
app.delete('/api/removeksize',  async (req, res) => {
  const id_ks = 3;
  try {
    await dao.removeKnownSize(id_ks);
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));