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

//get all users
exports.listUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM USER";
    db.all(sql, [], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const users = { id_u: 'Empty' };
        resolve(users);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const users = rows.map((t) => ({
          id_u: t.ID_U,
          name: t.Name,
          surname: t.Surname,
          address: t.Address,
          city: t.City,
          cap: t.CAP,
          state: t.State,
          zip: t.Zip,
          gender: t.Gender,
          height: t.Height,
          weight: t.Weight,
          waistline: t.Waistline,
          hips: t.Hips,
          legLength: t.LegLength,
          shoesNumber: t.ShoesNumber
        }));
        resolve(users);
      }
    });
  });
};

//get all rents
exports.listRents = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM RENT";
    db.all(sql, [], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const rents = { id_r: 'Empty' };
        resolve(rents);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const rents = rows.map((t) => ({
          id_r: t.ID_R,
          id_a: t.ID_A,
          idRenter: t.ID_RENTER,
          idBooker: t.ID_BOOKER,
          dataIn: t.START_DATE,
          dataOut: t.END_DATE,
          status: t.STATUS
        }));
        resolve(rents);
      }
    });
  });
};

//get all conversations
exports.listConversations = (id_u) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CONVERSATION CONV WHERE ID_BOOKER = ? OR ID_RENTER = ?";
    db.all(sql, [id_u, id_u], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const convs = { id_conv: 'Empty' };
        resolve(convs);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const convs = rows.map((t) => ({
          id_conv: t.ID_CONV,
          id_a: t.ID_A,
          idRenter: t.ID_RENTER,
          idBooker: t.ID_BOOKER
        }));
        resolve(convs);
      }
    });
  });
};


exports.listAllUserMessages = (id_u) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM MESSAGE WHERE ID_SENDER = ? OR ID_RECEIVER = ?";
    db.all(sql, [id_u, id_u], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const msgs = { id_m: 'Empty' };
        resolve(msgs);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const msgs = rows.map((t) => ({
          id_m: t.ID_M,
          id_conv: t.ID_CONV,
          idSender: t.ID_SENDER,
          idReceiver: t.ID_RECEIVER,
          date: t.DATE,
          text: t.TEXT
        }));
        resolve(msgs);
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
          brand: t.Brand,
          id_u: t.ID_U
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

// add a new conversation
exports.insertConversation = (conv) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO CONVERSATION(ID_A, ID_RENTER, ID_BOOKER) VALUES(?, ?, ?)";
    db.run(
      sql,
      [conv.id_a, conv.idRenter, conv.idBooker],
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


// add a new message
exports.insertMessage = (msg) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO MESSAGE (ID_CONV, ID_SENDER, ID_RECEIVER, DATE, TEXT) VALUES (?, ?, ?, ?, ?)";
    db.run(
      sql,
      [msg.id_conv, msg.idSender, msg.idReceiver, msg.date, msg.text],
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
  return new Promise((resolve, reject) => {
    const sql = "UPDATE USER SET NAME = ?, SURNAME = ?, ADDRESS = ?, CITY = ?," +
      "CAP = ?, STATE = ?, ZIP = ?, GENDER = ?, HEIGHT = ?, WEIGHT = ?," +
      "WAISTLINE = ?, HIPS = ?, LEGLENGTH = ?, SHOESNUMBER = ? WHERE ID_U =?";
    db.run(
      sql,
      [newInfos.name, newInfos.surname, newInfos.address, newInfos.city, newInfos.cap,
      newInfos.state, newInfos.zip, newInfos.gender, newInfos.height, newInfos.weight,
      newInfos.waistline, newInfos.hips, newInfos.legLength, newInfos.shoesNumber, newInfos.id_u],
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






//get all users
exports.listOperators = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CUSTOMER_SERVICE";
    db.all(sql, [], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const operators = { id_cs: 'Empty' };
        resolve(operators);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const operators = rows.map((t) => ({
          id_cs: t.ID_CS,
          name: t.NAME,
          surname: t.SURNAME,
        }));
        resolve(operators);
      }
    });
  });
};


//get all conversations
exports.listConversationsCS = (id_u) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CONVERSATION_CS CONV WHERE ID_USER = ?";
    db.all(sql, [id_u], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const convs = { id_conv: 'Empty' };
        resolve(convs);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const convs = rows.map((t) => ({
          id_conv: t.ID_CONV,
          id_u: t.ID_USER,
          id_cs: t.ID_CS,
          name_cs: t.NAME_CS
        }));
        resolve(convs);
      }
    });
  });
};


exports.listAllUserMessagesCS = (id_u) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM MESSAGE_CS WHERE ID_USER = ?";
    db.all(sql, [id_u], (err, rows) => {
      if (rows === undefined || rows.length === 0) {
        const msgs = { id_m: 'Empty' };
        resolve(msgs);
      }
      if (err) {
        reject(err);
        return;
      }
      else {
        const msgs = rows.map((t) => ({
              id_m: t.ID_M,
              id_conv: t.ID_CONV,
              idUser: t.ID_USER,
              idCS: t.ID_CS,
              date: t.DATE,
              text: t.TEXT,
              isSenderAUser: t.IS_SENDER_A_USER
        }));
        resolve(msgs);
      }
    });
  });
};



// add a new message
exports.insertMessageCS = (msg) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO MESSAGE_CS (ID_CONV, ID_USER, ID_CS, DATE, TEXT, IS_SENDER_A_USER) VALUES (?,?, ?, ?, ?, ?)";
    db.run(
      sql,
      [msg.id_conv, msg.idUser, msg.idCS, msg.date, msg.text, msg.isSenderAUser],
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
