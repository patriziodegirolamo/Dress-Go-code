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
          address: row[0].Address,
          city: row[0].City,
          cap: row[0].CAP,
          state: row[0].State,
          zip: row[0].Zip,
          gender: row[0].Gender,
          height: row[0].Height,
          weight: row[0].Weight,
          waistline: row[0].Waistline,
          hips: row[0].Hips,
          legLength: row[0].LegLength,
          shoesNumber: row[0].ShoesNumber
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
          EUsize: t.EU_Size,
          id_cat: t.ID_CAT,          
        }));
        resolve(ksizes);
      }
    });
  });
};


//get all announcements
exports.listAds = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ANNOUNCEMENT";
    db.all(sql, [], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const ads = { id_a: 'Empty' };
        resolve(ads);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const ads = rows.map((t) => ({
          id_a: t.ID_A,
          id_cat: t.ID_CAT,
          title: t.Title,
          description: t.Description,
          price: t.Price,
          size: t.Size,
          gender: t.Gender,
          brand: t.Brand
        }));
        resolve(ads);
      }
    });
  });
};

//get all images
exports.listAdsImages = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ADSIMAGE";
    db.all(sql, [], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const adsImages = { id_ai: 'Empty' };
        resolve(adsImages);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const adsImages = rows.map((t) => ({
          id_ai: t.ID_AI,
          id_a: t.ID_A,
          position: t.Position,
          url: t.URL
        }));
        resolve(adsImages);
      }
    });
  });
};

//get all brands
exports.listBrands = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM BRAND";
    db.all(sql, [], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const brand = { id_b: 'Empty' };
        resolve(brand);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const brands = rows.map((t) => ({
          id_b: t.ID_B,
          name: t.Name
        }));
        resolve(brands);
      }
    });
  });
};



/* POST */
// add a known size
exports.insertKnownSize = (ksize) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO KNOWNSIZE(ID_KS, ID_U, BRAND, EU_SIZE, ID_CAT) VALUES(?, ?, ?, ?, ?)";
    db.run(
      sql,
      [this.lastID, ksize.id_u, ksize.brand, ksize.eusize, ksize.id_cat],
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
    const sql = "UPDATE USER SET NAME = ?, SURNAME = ?, ADDRESS = ?, CITY = ?,"+
                "CAP = ?, STATE = ?, ZIP = ?, GENDER = ?, HEIGHT = ?, WEIGHT = ?," + 
                "WAISTLINE = ?, HIPS = ?, LEGLENGTH = ?, SHOESNUMBER = ? WHERE ID_U =?";
    db.run(
      sql,
      [newInfos.name, newInfos.surname, newInfos.address, newInfos.city, newInfos.cap, 
       newInfos.state, newInfos.zip, newInfos.gender, newInfos.height, newInfos.weight, 
       newInfos.waistline, newInfos.hips, newInfos.legLength, newInfos.shoesNumber,newInfos.id_u],
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