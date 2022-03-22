import { renderTemplate, setActive, showPage } from "./utils.js"
import {signUpForm,addUserSubmit} from "./js-for-pages/sign-up.js"
import {getUser}from "./js-for-pages/userPage.js"
import {onLoginHandling,logout,loggedInComponentsUpdate} from "./js-for-pages/login.js";


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
            getUser()
            break
        }
        case "page-sign-up":{
            signUpForm()
            addUserSubmit()
            break
        }
        case "page-login": {
            onLoginHandling()
            break
        }
        case "page-logout": {
            logout()
            break
        }
    }
}

document.getElementById("menu").onclick = renderMenuItems;
showPage("page-search") //Set the default page to render
loggedInComponentsUpdate()