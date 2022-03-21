import {SERVER} from "../settings.js"
import {encode} from "../utils.js"
const URL = SERVER + ""


export function getUser() {
    //document.getElementById("id-error").innerText = "" //reset error message
    const id = 2 //dummy data
    console.log("Start: getUser")
    //fetch("https://jsonplaceholder.typicode.com/users/" + id) //dummy data
    fetch(URL + "/persons/user1") //dummy data
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

let hobbieList = []

export function addHobbySubmit(){
    document.getElementById("add-hobby").onclick= addHobby
}

function addHobby() {
    let select = document.getElementById('hobby-select1');
    let value = select.options[select.selectedIndex].value;
    console.log(value);

    fetch("/persons/user1/add-hobby", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: "1",
            hobbyName: "Tennis",
            description: "Tennis er en fed sport"
        })
    });
}

export function getAllHobbies(){
    console.log("Start: getAllHobbies")
    if(hobbieList.length > 0){
        makeRows(hobbieList)
        return
    }
    fetch(URL + "/hobby")
        .then(res => res.json())
        .then(hobbies => {
            makeRows(hobbies)
            hobbieList = hobbies
        })
        .catch(e => console.error(e))
}

function makeRows(rows){
    const defaultSelect =  document.getElementById("hobby-select1").innerHTML
    document.getElementById("hobby-select1").innerHTML = defaultSelect + rows.map(hobby =>
    `
        <option>${encode(hobby.name)}</option>
    `
    ).join("\n")
}