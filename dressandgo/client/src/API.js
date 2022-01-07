const url = 'http://localhost:3000';

/** STUDYGROUPS APIs **/

/* TO GET THE LIST OF CATEGORIES */
async function getCategories() {
    const response = await fetch(url + '/api/allcategories');
    const cats = await response.json();
    if (cats.id_cat === 'Empty' ) {
        return [];
    }
    else {
        if (response.ok) {
            return cats.map((t) => ({
                ...t,
                id_cat: t.id_cat,
                name: t.name,
                address: t.url,
                gender: t.gender
            }));
        } else {
            throw cats;  // an object with the error coming from the server
        }
    }
}


/* TO GET THE INFOS ABOUT THE USER LOGGED */
async function getUserInfos() {
    const response = await fetch(url + '/api/userInfo');
    const user = await response.json();
    if (user.id_u === 'Empty' ) {
        return [];
    }
    else {
        if (response.ok) {
            return user;
        } else {
            throw user;  // an object with the error coming from the server
        }
    }
}

/* TO GET THE LIST OF KNOWN SIZES INSERTED BY THE USER */
async function getKnownSizes() {
    const response = await fetch(url + '/api/knownsizes');
    const knownsizes = await response.json();
    if (knownsizes.id_ks === 'Empty' ) {
        return [];
    }
    else {
        if (response.ok) {
            return knownsizes.map((t) => ({
                ...t,
                id_ks: t.id_ks,
                brand: t.brand,
                EUsize: t.EUsize,
                id_cat: t.id_cat
            }));
        } else {
            throw knownsizes;  // an object with the error coming from the server
        }
    }
}

/* TO GET THE LIST OF ANNOUNCEMENTS */
async function getAds() {
  const response = await fetch(url + '/api/allads');
  const ads = await response.json();
  if (ads.id_a === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return ads.map((t) => ({
              ...t,
              id_a: t.id_a,
              id_cat: t.id_cat,
              title: t.title,
              description: t.description,
              price: parseFloat(t.price),
              size: t.size,
              gender: t.gender,
              brand: t.brand
          }));
      } else {
          throw ads;  // an object with the error coming from the server
      }
  }
}


/* TO GET THE LIST OF ANNOUNCEMENTS IMAGES */
async function getAdsImages() {
  const response = await fetch(url + '/api/alladsimages');
  const adsimages = await response.json();
  if (adsimages.id_a === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return adsimages.map((t) => ({
              ...t,
              id_ai: t.id_ai,
              id_a: t.id_a,
              position: t.position,
              url: t.url
          }));
      } else {
          throw adsimages;  // an object with the error coming from the server
      }
  }
}

/* TO GET THE LIST OF BRANDS */
async function getBrands() {
  const response = await fetch(url + '/api/allbrands');
  const brands = await response.json();
  if (brands.id_b === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return brands.map((t) => ({
              ...t,
              id_cat: t.id_cat,
              name: t.name
          }));
      } else {
          throw brands;  // an object with the error coming from the server
      }
  }
}

/* TO GET THE LIST OF USERS */
async function getUsers() {
  const response = await fetch(url + '/api/allusers');
  const users = await response.json();
  if (users.id_u === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return users.map((t) => ({
              ...t,
              id_r: t.id_r,
              id_a: t.id_a,
              idRenter: t.idRenter,
              idBooker: t.idBooker,
              dataIn: t.dataIn,
              dataOut: t.dataOut,
              status: t.status
          }));
      } else {
          throw users;  // an object with the error coming from the server
      }
  }
}

/* TO GET THE LIST OF CONVERSATIONS */
async function getConversations(id_u) {
  const response = await fetch(url + '/api/allconversations?id_u='+id_u);
  const convs = await response.json();
  if (convs.id_conv === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return convs.map((t) => ({
              ...t,
              id_conv: t.id_conv,
              id_a: t.id_a,
              idRenter: t.idRenter,
              idBooker: t.idBooker
          }));
      } else {
          throw convs;  // an object with the error coming from the server
      }
  }
}

/* TO GET THE LIST OF RENTS */
async function getRents(id_u) {
  const response = await fetch(url + '/api/allrents?id_u='+id_u);
  const rents = await response.json();
  if (rents.id_r === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return rents.map((t) => ({
              ...t,
              id_r: t.id_r,
              id_a: t.id_a,
              idRenter: t.idRenter,
              idBooker: t.idBooker,
              startDate: t.startDate,
              endDate: t.endDate, 
              status: t.status
          }));
      } else {
          throw rents;  // an object with the error coming from the server
      }
  }
}

// TO GET THE LIST OF MESSAGES OF A CONVERSATION 
/**
async function getMessages(id_conv) {
  const response = await fetch(url + '/api/allmessages?id_conv='+id_conv);
  const msgs = await response.json();
  if (msgs.id_m === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return msgs.map((t) => ({
              ...t,
              id_m: t.id_m,
              id_conv: t.id_conv,
              idSender: t.idSender,
              idReceiver: t.idReceiver,
              date: t.date,
              text: t.text
          }));
      } else {
          throw msgs;  // an object with the error coming from the server
      }
  }
}
 */

// TO GET THE LIST OF MESSAGES OF THE LOGGED USER 
async function getAllUserMessages(id_u) {
  const response = await fetch(url + '/api/allUsermessages?id_u=' + id_u);
  const msgs = await response.json();
  if (msgs.id_m === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return msgs.map((t) => ({
              ...t,
              id_m: t.id_m,
              id_conv: t.id_conv,
              idSender: t.idSender,
              idReceiver: t.idReceiver,
              date: t.date,
              text: t.text
          }));
      } else {
          throw msgs;  // an object with the error coming from the server
      }
  }
}




//DA QUI

/* TO GET THE LIST OF USERS */
async function getOperators() {
  const response = await fetch(url + '/api/alloperators');
  const operators = await response.json();
  if (operators.id_cs === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return operators.map((t) => ({
              ...t,
              id_cs: t.id_cs,
              name: t.name,
              surname: t.surname
          }));
      } else {
          throw operators;  // an object with the error coming from the server
      }
  }
}

/* TO GET THE LIST OF CONVERSATIONS */
async function getConversationsCS(id_u) {
  const response = await fetch(url + '/api/allconversationsCS?id_u='+id_u);
  const convs = await response.json();
  if (convs.id_conv === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return convs.map((t) => ({
              ...t,
              id_conv: t.id_conv,
              id_u: t.id_u,
              id_cs: t.id_cs,
              name_cs : t.name_cs
          }));
      } else {
          throw convs;  // an object with the error coming from the server
      }
  }
}

// TO GET THE LIST OF MESSAGES OF THE LOGGED USER 
async function getAllUserMessagesCS(id_u) {
  const response = await fetch(url + '/api/allUsermessagesCS?id_u=' + id_u);
  const msgs = await response.json();
  if (msgs.id_m === 'Empty' ) {
      return [];
  }
  else {
      if (response.ok) {
          return msgs.map((t) => ({
              ...t,
              id_m: t.id_m,
              id_conv: t.id_conv,
              idUser: t.idUser,
              idCS: t.idCS,
              date: t.date,
              text: t.text,
              isSenderAUser: t.isSenderAUser

          }));
      } else {
          throw msgs;  // an object with the error coming from the server
      }
  }
}






//A QUI



/* TO MODIFY USER INFOS */
async function modifyUsInfos(newInfos) {
  return new Promise((resolve, reject) => {
    fetch('/api/modifyUserInfo', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_u: newInfos.id_u, name: newInfos.name, surname: newInfos.surname, address: newInfos.address,
        city: newInfos.city, cap: newInfos.cap, state: newInfos.state, zip: newInfos.zip, 
        gender: newInfos.gender, height: newInfos.height, weight: newInfos.weight, waistline: newInfos.waistline,
        hips: newInfos.hips, legLength: newInfos.legLength, shoesNumber: newInfos.shoesNumber }),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => reject({ error: 'Cannot parse the response.' }));
      }
    }).catch(() => {
      reject({ error: 'Cannot communicate with the server.' });
    })
  });
}


/* TO INSERT A NEW KNOWN SIZE */
async function insertKnownSize(ksize) {
    return new Promise((resolve, reject) => {
      fetch('/api/newknownsize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_u: ksize.id_u, brand: ksize.brand, eusize: ksize.EUsize, id_cat: ksize.id_cat }),
      }).then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((message) => { reject(message); })
            .catch(() => reject({ error: 'Cannot parse the response.' }));
        }
      }).catch(() => {
        reject({ error: 'Cannot communicate with the server.' });
      })
    });
  }

  
/* TO INSERT A NEW CONVERSATION */
async function insertConversation(conv, mess) {
  return new Promise((resolve, reject) => {
    fetch('/api/newconversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_a: conv.id_a, idRenter: conv.idRenter, idBooker: conv.idBooker, 
        idSender: mess.idSender, idReceiver: mess.idReceiver, date: mess.date, text: mess.text }),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => reject({ error: 'Cannot parse the response.' }));
      }
    }).catch(() => {
      reject({ error: 'Cannot communicate with the server.' });
    })
  });
}

/* TO INSERT A NEW MESSAGE */
async function insertMessage(msg) {
  return new Promise((resolve, reject) => {
    fetch('/api/newmessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id_conv: msg.id_conv, idSender: msg.idSender, idReceiver: msg.idReceiver, date: msg.date, text: msg.text}),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => reject({ error: 'Cannot parse the response.' }));
      }
    }).catch(() => {
      reject({ error: 'Cannot communicate with the server.' });
    })
  });
}

/* TO INSERT A NEW RENT */
async function insertRent(rent) {
  return new Promise((resolve, reject) => {
    fetch('/api/newrent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id_a: rent.id_a, id_renter: rent.id_renter, id_booker: rent.id_booker, startDate: rent.startDate, endDate: rent.endDate, status: rent.status}),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => reject({ error: 'Cannot parse the response.' }));
      }
    }).catch(() => {
      reject({ error: 'Cannot communicate with the server.' });
    })
  });
}



/* TO REMOVE A KNOWN SIZE INSERTED BY THE USER*/
async function removeKnownSize(id_ks) {
  return new Promise((resolve, reject) => {
    fetch(url + '/api/removeksize?id_ks=' + id_ks, {
      method: 'DELETE'
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => reject({ error: 'Cannot parse the response.' }));
      }
    }).catch(() => {
      reject({ error: 'Cannot communicate with the server.' });
    })
  });
}



/* TO INSERT A NEW MESSAGE */
async function insertMessageCS(msg) {
  return new Promise((resolve, reject) => {
    fetch('/api/newmessageCS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id_conv: msg.id_conv, idUser: msg.idUser, idCS: msg.idCS, date: msg.date, text: msg.text, isSenderAUser: msg.isSenderAUser}),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => reject({ error: 'Cannot parse the response.' }));
      }
    }).catch(() => {
      reject({ error: 'Cannot communicate with the server.' });
    })
  });
}

  

export {getCategories, getUserInfos, getKnownSizes, getAds, getAdsImages, getBrands, getAllUserMessages,
        getUsers, getConversations, modifyUsInfos, insertKnownSize, insertConversation, insertMessage, insertRent,
        removeKnownSize, getOperators, getConversationsCS, getAllUserMessagesCS, getRents, insertMessageCS};