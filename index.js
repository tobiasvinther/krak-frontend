import { renderTemplate, setActive, showPage } from "./utils.js"
import {signUpForm,addUserSubmit} from "./js-for-pages/sign-up.js"
import {getUser}from "./js-for-pages/userPage.js"
import {getPersonData} from "./js-for-pages/search.js";
import {onLoginHandling,logout,loggedInComponentsUpdate} from "./js-for-pages/login.js";
import {getAllHobbies}from "./js-for-pages/userPage.js"
import {addHobbySubmit} from "./js-for-pages/userPage.js"

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
            getPersonData()
            break
        }
        case "page-my-details":{
            getUser()
            getAllHobbies()
            addHobbySubmit()
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