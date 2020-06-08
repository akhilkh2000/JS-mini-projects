// this file gives the display content for each route
import view from '../utils/view.js';
import Story from '../components/Story.js'
import baseUrl from '../utils/baseUrl.js'
import store from '../store.js'
import checkFavorite from '../utils/checkFavorite.js'


//async function to fetch stories from API
export default async function displayStories(path){
    const {favorites} = store.getState(); // destructure to get favorites array
    const stories = await getStories(path);
    console.log(favorites);
     
    //console.log(stories);
    const hasStories = stories.length > 0;
  
    let story = '';
    if(hasStories){
        //here we call Story function on each story JSON object and use spread operator to add index to display in order
         story = stories.map((s,i) => Story({...s , index : i+1 ,isFavorite : checkFavorite(favorites,s)})).join(''); // also check favorite called to check if any story is in favorite
        //  console.log(typeof(story))
    } else{
         story = 'No stories';
    }
    view.innerHTML = `<div>${story}</div>`;

    const $favorites = document.querySelectorAll('.favorite');
    $favorites.forEach(favoriteButton => {
        favoriteButton.addEventListener('click', async function() {
            const s = JSON.parse(this.dataset.story); // we get the entire story object from the data element on the span tagged favorite
            const isFavorite = checkFavorite(favorites,s);
            if(isFavorite){
                // then we have to remove it from favorites store (we provide the action object)
                store.dispatch({type : "REMOVE_FAVORITE" ,payload : {favorite : s}});
            } else{
                store.dispatch({type:"ADD_FAVORITE", payload:{favorite:s}});
            }
            // re-render page with updated data
            await displayStories(path);
        });
    });
}

async function getStories(path){
    // the first two routes in our app are different from the API endpoint routes so we need to match them
    const isHomeRoute = (path === '/');
    const isNewRoute = (path ==='/new');
    if(isHomeRoute){
        path = '/news';
    }else if(isNewRoute){
        path = '/newest';
    }

   const response = await fetch(`${baseUrl}${path}`);
    const stories = await response.json();
    return stories;
}


//API Endpoint
// https://node-hnapi.herokuapp.com

//the routes on the api endpoint are the routes on the right
// / (Top) -> /new
//  /new (New) -> /newest
// /ask (Ask) -> /show
// /jobs 