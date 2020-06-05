import view from '../utils/view.js';
import Story from '../components/Story.js';
import baseUrl from '../utils/baseUrl.js'
export default async function Item(path){

    let hasError = false;
    let hasComments = false;
    let story = null;
    try{
         story = await getStory();
         hasComments = story.comments.length > 0;
    } catch(error){
        hasError = true;
        console.error(error);
    }
   if(hasError){
       view.innerHTML = ` <div class = "error">Error in fetching comments! </div>`
   } else{
    view.innerHTML = `
    <div>
         ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : "NO COMMENTS!"}
    `;

   }
    
}

async function getStory(){
   const storyId =  window.location.hash.split('?id=')[1];
   // console.log('storyId:', storyId) // we get an array of two parts it will have part before the split string as one entry and the second entry will be the part after it
    // now we use this storyId to get the item data from the API
    // the route for this is 

   const response  = await fetch(`${baseUrl}/item/${storyId}`);
   const story = await response.json();
   return story;
}
