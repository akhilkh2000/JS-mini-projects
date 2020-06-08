import view from '../utils/view.js';
import store from '../store.js';
import Story from '../components/Story.js';
import checkFavorite from '../utils/checkFavorite.js';

export default function Favorites(){
    const {favorites} = store.getState();
    const hasFavorites = favorites.length >0;
    view.innerHTML = `<div> 
    ${hasFavorites ? favorites.map((story,i) => Story({
        ...story , isFavorite: checkFavorite(favorites,story) ,
        index : i+1

    })).join('') : "Empty :( . Add some Favorites!"}
     </div>`;


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
             Favorites();
        });
    });

}