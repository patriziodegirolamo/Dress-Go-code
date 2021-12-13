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
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CATEGORY CAT";
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

//get infos about the user 
exports.userInfos = (id_u) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM USER U WHERE ID_U = ?";
    db.all(sql, [id_u], (err, row) => {
      if (row[0] === undefined || row[0].length === 0) {
        const user = { id_u: 'Empty' };
        resolve(user);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const user = {
          id_u: row[0].ID_U,
          name: row[0].Name,
          surname: row[0].Surname,
          address: row[0].Address  
      };
        resolve(user);
      }
    });
  });
};

//get all known sizes inserted by the user logged
exports.listKnownSizes = (id_u) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM KNOWNSIZE KS WHERE ID_U = ?";
    db.all(sql, [id_u], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const ksizes = { id_ks: 'Empty' };
        resolve(cat);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const ksizes = rows.map((t) => ({
          id_ks: t.ID_KS,
          brand: t.Brand,
          EUsize: t.EU_Size
        }));
        resolve(ksizes);
      }
    });
  });
};





/* POST */
// add a known size
exports.insertKnownSize = (ksize) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO KNOWNSIZE(ID_KS, ID_U, BRAND, EU_SIZE) VALUES(?, ?, ?, ?)";
    db.run(
      sql,
      [this.lastID, ksize.id_u, ksize.brand, ksize.eusize],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

/* UPDATE */

// update infos of a user 
exports.modifyUserInfos = (newInfos) => {
  console.log(newInfos);
  return new Promise((resolve, reject) => {
    const sql = "UPDATE USER SET NAME = ?, SURNAME = ?, ADDRESS = ? WHERE ID_U =?";
    db.run(
      sql,
      [newInfos.name, newInfos.surname, newInfos.address, newInfos.id_u],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};



/* DELETE */
//delete a known size
exports.removeKnownSize = (id_ks) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM KNOWNSIZE WHERE ID_KS=?";
    db.run(sql, [id_ks], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};