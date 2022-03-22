import {showPage} from "../utils.js";
import {SERVER} from "../settings.js";
import {makeOptions} from "../fetchUtils.js";


const URL = SERVER+"/auth/login"

export function onLoginHandling(){
    document.getElementById("btn-login").onclick = login
}

function login(){
    const user = {}
    user.userName = document.getElementById("username-login").value
    user.password = document.getElementById("password-login").value

    fetch(URL,makeOptions("POST",user))
        .then(res => {
            if(!res.ok){
                if(res.status === 401){
                    document.getElementById("login-error").style.display = "block"
                    return Promise.reject("Wrong username or password")
                }
            }
            return res.json()
        })
        .then(response => {
            const token = response.token
            const role = response.roles[0]
            setLoginStatus(token,role)
            showPage("page-my-details")
        })
        .catch(e => {document.getElementById("login-error").innerText = e})

}


export function logout(){
    setLoginStatus(null)
    showPage("page-search")
}

export function setLoginStatus(token, loggedIn){
    if(token) {
        sessionStorage.setItem("token", token)
        if (loggedIn) {
            sessionStorage.setItem("loggedIn", loggedIn)
        }
    }
    else {
        sessionStorage.clear("token")
        sessionStorage.clear("loggedIn")
    }
    loggedInComponentsUpdate()
}

export function loggedInComponentsUpdate(){
    const loginToken = sessionStorage.getItem("token")
    const loggedInRole = sessionStorage.getItem("loggedIn")
    document.getElementById("logged-in-user").style.display = "none"
    document.getElementById("not-logged-in").style.display = "block"
    if(loggedInRole === "USER"){
        document.getElementById("logged-in-user").style.display = loginToken ? "block": "none"
    }
    if(loginToken){
        document.getElementById("logged-in-user").style.display = "block"
        document.getElementById("not-logged-in").style.display="none"
    }
    document.getElementById("page-login").style.display = loginToken ? "none" : "block"
    document.getElementById("page-logout").style.display = loginToken ? "block" : "none"
}