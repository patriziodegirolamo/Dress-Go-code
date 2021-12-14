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
                url: t.url,
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
              price: t.price,
              size: t.size,
              url: t.url,
          }));
      } else {
          throw ads;  // an object with the error coming from the server
      }
  }
}

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
        body: JSON.stringify({ id_u: ksize.id_u, brand: ksize.brand, eusize: ksize.eusize }),
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
      fetch(url + '/api/removeksizes', {
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
  

export {getCategories, getUserInfos, getKnownSizes, getAds, modifyUsInfos, insertKnownSize, removeKnownSize};