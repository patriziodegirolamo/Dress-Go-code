"use strict";
/* Data Access Object (DAO) module for accessing Studygroups */

const sqlite = require("sqlite3");

// open the database
const db = new sqlite.Database("dressandgoDB.db", (err) => {
  if (err) throw err;
});

/* GET */
//get all categories
exports.listCategories = (gender) => {
    console.log('DAO');
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CATEGORY CAT WHERE CAT.GENDER = ?";
    db.all(sql, [gender], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const cat = { id_cat: 'Empty' };
        resolve(cat);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const categories = rows.map((t) => ({
          id_cat: t.ID_CAT,
          name: t.Name,
          url: t.URL,
          gender: t.Gender
        }));
        resolve(categories);
      }
    });
  });
};


