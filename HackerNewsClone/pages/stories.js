// this file gives the display content for each route
import view from '../utils/view.js';
import Story from '../components/Story.js'
import baseUrl from '../utils/baseUrl.js'
import store from '../store.js'


//async function to fetch stories from API
export default async function stories(path){
    const {favorites} = store.getState(); // destructure to get favorites array
    const stories = await getStories(path);

     
    //console.log(stories);
    const hasStories = stories.length > 0;
  
    let story = '';
    if(hasStories){
        //here we call Story function on each story JSON object and use spread operator to add index to display in order
         story = stories.map((s,i) => Story({...s , index : i+1})).join('');
        //  console.log(typeof(story))
    } else{
         story = 'No stories';
    }
    view.innerHTML = `<div>${story}</div>`;
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