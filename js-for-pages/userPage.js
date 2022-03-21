import {SERVER} from "../settings.js"
const URL = SERVER + "/persons/"


export function getUser() {
    //document.getElementById("id-error").innerText = "" //reset error message
    const id = 2 //dummy data
    console.log("Start: getUser")
    //fetch("https://jsonplaceholder.typicode.com/users/" + id) //dummy data
    fetch(URL + "user1") //dummy data
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

        })
        .catch(err => {
            //document.getElementById("id-error").innerText = "User doesn't exist"
            console.error("Error caught: " + err)
        }) //catch errors
        .finally(e => console.log("End: getUser"))
}

export function addHobbySubmit(){
    document.getElementById("add-hobby").onclick= addHobby
}

function addHobby() {
    let select = document.getElementById('hobby-select');
    let value = select.options[select.selectedIndex].value;
    console.log(value);

    const hobbyToAdd = {}
}