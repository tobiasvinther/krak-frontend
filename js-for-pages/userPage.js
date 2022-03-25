import {SERVER} from "../settings.js"
import {encode} from "../utils.js"
import {makeOptions} from "../fetchUtils.js";
const URL = SERVER


export function getUser() {
    //document.getElementById("id-error").innerText = "" //reset error message
    const id = 2 //dummy data
    console.log("Start: getUser")
    //fetch("https://jsonplaceholder.typicode.com/users/" + id) //dummy data
    fetch(URL + "/persons/authenticatedUser", {
        headers : {
            'Authorization' : "Bearer "+ sessionStorage.getItem("token")
        }
    }) //dummy data
        .then(res => {
            if (!res.ok) {
                return Promise.reject("Error :" + res.status) //error handling
            }
            return res.json() //get it as json
        })
        .then(data => { //now we have the data as json and we can start to use it
            document.getElementById("id-name").innerText = data.firstName + " " + data.lastName;
            document.getElementById("id-phone").innerText = data.phoneNumber
            document.getElementById("id-city").innerText = data.city
            document.getElementById("id-email").innerText = data.email


            //create a list of the person's hobbies
            /*
            document.getElementById("id-hobby-list").innerHTML = data.map(person =>
            `
                <li>${encode(person.hobbies)}</li>
            `
            ).join("\n")

             */


        })
        .catch(err => {
            //document.getElementById("id-error").innerText = "User doesn't exist"
            console.error("Error caught: " + err)
        }) //catch errors
        .finally(e => console.log("End: getUser"))
}

let hobbyList = []

export function addHobbySubmit(){
    document.getElementById("add-hobby").onclick= addHobby
}

//get this to work...

function addHobby1() {
    let select = document.getElementById('hobby-select1');
    let value = select.options[select.selectedIndex].value;
    const name = select.options[select.selectedIndex].innerText;
    console.log(value);

    fetch(URL + "/persons/user1/add-hobby", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: value,
            hobbyName: name
        })
    });
}


//or this... maybe the issue is that nothing is returned?
function addHobby(){

    const select = document.getElementById('hobby-select1');
    const value = select.options[select.selectedIndex].value;
    const name = select.options[select.selectedIndex].innerText;

    const hobby ={}

    hobby.id = value
    hobby.hobbyName = name

    fetch(URL + "/persons/user1/add-hobby", makeOptions("PATCH", hobby, false))
        .then(res=>{
            if(!res.ok){
                return Promise.reject("Error: " + res.status)
            }
            return res.json()
        })
        .catch(e => console.error(e))
}

export function getAllHobbies(){
    console.log("Start: getAllHobbies")
    if(hobbyList.length > 0){
        makeRows(hobbyList)
        return
    }
    fetch(URL + "/hobby")
        .then(res => res.json())
        .then(hobbies => {
            makeRows(hobbies)
            hobbyList = hobbies
        })
        .catch(e => console.error(e))
}

function makeRows(rows){
    const defaultSelect =  document.getElementById("hobby-select1").innerHTML

    document.getElementById("hobby-select1").innerHTML = defaultSelect + rows.map(hobby =>
    `
        <option value="${hobby.id}">${encode(hobby.name)}</option>
    `
    ).join("\n")
}

/*
export function getHobbyList() {

    fetch(URL + "/persons/user1/get-hobbies") //dummy data
        .then(res => {
            if (!res.ok) {
                return Promise.reject("Error :" + res.status) //error handling
            }
            return res.json() //get it as json
        })
        .then(data => { //now we have the data as json and we can start to use it
           const itemsAsArray = []




        })
        .catch(err => {
            //document.getElementById("id-error").innerText = "User doesn't exist"
            console.error("Error caught: " + err)
        }) //catch errors
        .finally(e => console.log("End: getUser"))


    let itemsAsString = names;
    itemsAsString = names.map(name => `<li> ${name} </li>`).join("\n")
    document.getElementById("id-hobby-list").innerHTML = itemsAsString
}
 */