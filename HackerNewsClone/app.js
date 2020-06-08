import RouterHandler from './router.js';

// to get access to hash URL's and change link to active class to underline

window.onhashchange = () =>{
    // console.log("changed");
    makeActiveLink();

}

function makeActiveLink (){
    const $headerLinks = document.querySelectorAll('.header-link');
    $headerLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const currPath = window.location.hash;
        if(currPath == linkPath){
            link.classList.add('active');
        } else{
            link.classList.remove('active');
        }
    })
}
class App{
    constructor(){
        makeActiveLink();
        console.log("App Works!");
        new RouterHandler(); // starting instance of Router
    }
}

new App();