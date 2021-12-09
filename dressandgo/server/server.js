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


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));