import Stories from './pages/stories.js';   
import Item from './pages/item.js'
const router = new Navigo(null, true, '#'); // to use the hash router

export default class RouterHandler{
    constructor(){
        this.createRoutes();
    }

    createRoutes(){
        // routes array will hold all our routes
        const routes = [
            {path:'/', page: Stories}, // Stories is a function imported
            {path:'/new', page:Stories},
            {path:'/ask',page:Stories},
            {path:'/show',page:Stories},
            {path: '/item', page:Item}
        ];
        routes.forEach(route =>{
            // router.on accepts the path and the fucntion to run for that route
            router.on(route.path,() =>{
                route.page(route.path);
            }).resolve();
        })
    }
}