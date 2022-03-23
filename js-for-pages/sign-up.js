import {SERVER} from "../settings.js"
import {makeOptions} from"../fetchUtils.js"
import {showPage} from "../utils.js"

const URL = SERVER+"/auth/register"

export function signUpForm() {
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("confirmPassword").disabled = true;
    //Hides ul items maybe there is a better way for this
    document.getElementById("empty").style.display = "None"
    document.getElementById("length").style.display = "None"
    document.getElementById("letter").style.display = "None"
    document.getElementById("capital").style.display = "None"
    document.getElementById("number").style.display = "None"
    document.getElementById("matcher").style.display = "None"


    //Password validator monster maybe it could be made smarter who knows no framework or library
    document.getElementById("password").onkeyup = function (){
        var pwd = document.getElementById("password").value
        if(pwd === ""){
            document.getElementById("empty").innerText = "Password can not be empty"
            document.getElementById("empty").style.display = "Block"
        }else{
            document.getElementById("empty").style.display = "None"
        }if(pwd.length < 6){
            document.getElementById("length").innerText = "Password must be at least 6 characters"
            document.getElementById("length").style.display = "Block"
        }else{
            document.getElementById("length").style.display = "None"
        }if(!pwd.match(/[A-z]/)){
            document.getElementById("letter").innerText = "Password needs 1 letter"
            document.getElementById("letter").style.display = "Block"
        }else{
            document.getElementById("letter").style.display = "None"
        }if(!pwd.match(/[A-Z]/)){
            document.getElementById("capital").innerText = "Password need 1 capital letter"
            document.getElementById("capital").style.display = "Block"
        }else{
            document.getElementById("capital").style.display = "None"
        }if(!pwd.match(/[0-9]/)){
            document.getElementById("number").innerText = "Password need 1 number"
            document.getElementById("number").style.display = "Block"
        }else {
            document.getElementById("number").style.display = "None"
        }
        if (pwd != "" && pwd.length >= 5 && pwd.match(/[A-z]/) && pwd.match(/[A-Z>]/)) {
            document.getElementById("confirmPassword").disabled = false;
        } else {
            document.getElementById("confirmPassword").disabled = true;
        }
    }

    //Slight bug only checks on confirmPassword keyup so if you delete a char on password it still thinks it's matching
    document.getElementById("confirmPassword").onkeyup = function () {
        var pwd = document.getElementById("password").value
        var cpwd = document.getElementById("confirmPassword").value
        if (pwd === cpwd) {
            document.getElementById("matcher").className = "list-group-item list-group-item-success"
            document.getElementById("matcher").innerText = "Passwords are matching"
            document.getElementById("matcher").style.display = "Block"
            document.getElementById("submit-btn").disabled = false
        } else {
            document.getElementById("matcher").className = "list-group-item list-group-item-danger"
            document.getElementById("matcher").innerText = "Passwords are  not matching"
            document.getElementById("matcher").style.display = "Block"
            document.getElementById("submit-btn").disabled = true
        }
    }
}

export function addUserSubmit(){
    document.getElementById("submit-btn").onclick= addUser

}

function addUser(){
    const person={}
    person.username = document.getElementById("username").value
    person.email = document.getElementById("email").value
    person.password = document.getElementById("password").value

    fetch(URL,makeOptions("POST",person,false))
        .then(res=>{
            if(!res.ok){
                document.getElementById("username").value = ""
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("confirmPassword").value = ""
                document.getElementById("new-user-success").innerText = "User already exist"
                document.getElementById("new-user-success").className = "alert alert-danger"
                document.getElementById("new-user-success").style.display = "Block"
                document.getElementById("matcher").style.display = "None"
                return Promise.reject("Error: "+ res.status)
            }
            return res.json()
        })
        .then(newUser =>{
            document.getElementById("matcher").style.display = "None"
            document.getElementById("username").value = ""
            document.getElementById("email").value = ""
            document.getElementById("password").value = ""
            document.getElementById("confirmPassword").value = ""
            document.getElementById("new-user-success").innerText = "User created successfully"
            document.getElementById("new-user-success").className = "alert alert-success"
            document.getElementById("new-user-success").style.display = "Block"
            document.getElementById("matcher").style.display = "None"
        })
        .catch(e=>console.error(e))
}




