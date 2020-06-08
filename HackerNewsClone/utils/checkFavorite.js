export default function checkFavorite(favorites, story){
    const isFav = favorites.some( fav =>{
        return fav.id === story.id;
    })
    return isFav;

}