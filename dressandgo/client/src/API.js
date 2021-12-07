const url = 'http://localhost:3000';

/** STUDYGROUPS APIs **/

/* TO GET THE LIST OF CATEGORIES */
async function getCategories() {
    console.log('API');
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




export default getCategories;