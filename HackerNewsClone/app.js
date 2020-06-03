import RouterHandler from './router.js';
class App{
    constructor(){
        console.log("App Works!");
        new RouterHandler(); // starting instance of Router
    }
}

new App();