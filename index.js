import { renderTemplate, setActive, showPage } from "./utils.js"
//import { setupLoginHandlers, logout, updateLoginDependentComponents } from "./js-for-pages/login.js"
//import {getAllCars } from "./js-for-pages/seeOurCars.js";
//import {addCarHandles}from"./js-for-pages/addCar.js"

function renderMenuItems(evt) {
    const element = evt.target
    setActive(element)
    const id = element.id;
    renderTemplate(id)  //This setups the HTML for the page
    switch (id) {
        //Here you can execute JavaScript for the selected page
        // case "page-1": {
        //   break
        // }
        case "page-search": {
            //getAllCars()
            break
        }
        case "page-my-details":{
            //addCarHandles()
            break
        }
        case "page-sign-up":{
            //addCarHandles()
            break
        }
        case "page-login": {
            //setupLoginHandlers()
            break
        }
        case "page-logout": {
            //logout()
            break
        }
    }
}

document.getElementById("menu").onclick = renderMenuItems;
showPage("page-my-datails") //Set the default page to render
//updateLoginDependentComponents()