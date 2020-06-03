// this file gives the display content for each route
import view from '../utils/view.js';

export default function stories(path){
    view.innerHTML = `<div> ${path} </div>`;
}