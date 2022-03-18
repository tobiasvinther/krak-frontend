import{encode}from"../utils.js"
import{SERVER}from"../settings.js"

const URL = SERVER+"/hobby"
let myPersonData = []

//document.getElementById("search-button").onclick = getPersonData

export function getPersonData(){
    document.getElementById("search-button").onclick = findUser
    if(myPersonData.length > 0){
        makeRows(myPersonData)
        return
    }
    fetch(URL)
        .then(res => res.json())
        .then(hobby => {
            //makeRows(hobby)
            myPersonData = hobby
        })
        .then( () => {
            document.getElementById("search-button").onclick = findUser
        })
        .catch(e => console.error(e))
}

function findUser(evt) {
    evt.preventDefault();
    console.log("test")
    const result = myPersonData.filter(hobby => {
        return hobby.name === document.getElementById("search").value //Phone i stedet for navn
    })
    makeRows(result)
}

function makeRows(rows){
    const trows =  rows.map(hobby =>`
    <tr>
        <td>Firstname</td>
        <td>Lastname</td> 
        <td>Phone</td>
        <td>Email</td>
        <td>Adress</td>
        <td>City</td>   
        <td>${encode(hobby.name)}</td>
        <td>${encode(hobby.description)}</td>
    </tr>
    `).join("\n")
    document.getElementById("search-body").innerHTML = trows
}