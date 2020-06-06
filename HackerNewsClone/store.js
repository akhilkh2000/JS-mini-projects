// to add our favorites we use this file in the root of the app
// it is stored in the global state 
// we also use reducers here

// initial state

function createStore(reducer){
    let currentState = reducer(undefined,{}); // create an empty favorite state
    return {
        getState : () => currentState,
        dispatch: (action) => {
            currentState = reducer(currentState,action);
        }
    }

}

const initialState = {
    favorites : []
};
function favoritesReducer (state = initialState,action){
    switch(action.type){
        case  "ADD_FAVORITE": {
                const addedFavorite = action.payload.favorite;
                const favorites = [...state.favorites,addedFavorite];
                return {favorites}; // new state with added new fav
        }
        case "REMOVE_FAVORITE":{
            const removedFavorite = action.payload.favorite;
           const favorites = state.favorites.filter(fav => fav.id !=removedFavorite.id);
            return {favorites};
        }
        default :
            return state;//return prev state

    }
}

const action ={type:"ADD_FAVORITE" , payload: {favorite:{id:1 ,title:"story1"}}}

const store = createStore(favoritesReducer);
store.dispatch(action);
console.log(store.getState);
export default store;