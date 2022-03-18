import{encode}from"../utils.js"
import{SERVER}from"../settings.js"

const URL = SERVER+"/hobby"
let myPersonData = []

export function getPersonData(){
    if(myPersonData.length > 0){
        makeRows(myPersonData)
        return
    }
    fetch(URL)
        .then(res => res.json())
        .then(hobby => {
            makeRows(hobby)
            myPersonData = hobby
        })
        .catch(e => console.error(e))
}

function makeRows(rows){
    const trows =  rows.map(hobby =>`
    <tr>
        <td>Person</td>
        <td>Adress</td> 
        <td>Phone</td>   
        <td>${encode(hobby.name)}</td>
        <td>${encode(hobby.description)}</td>
    </tr>
    `).join("\n")
    document.getElementById("search-body").innerHTML = trows
}