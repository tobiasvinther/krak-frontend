import{encode}from"../utils.js"
import{SERVER}from"../settings.js"

const URL = SERVER+"/persons"
let myPersonData = []

//document.getElementById("search-button").onclick = getPersonData

export function getPersonData(){
    document.getElementById("search-button").onclick = findUser
    /*if(myPersonData.length > 0){
        makeRows(myPersonData)
        return
    }*/
    fetch(URL)
        .then(res => res.json())
        .then(person => {
            //makeRows(person)
            myPersonData = person
        })
        .then( () => {
            document.getElementById("search-button").onclick = findUser
        })
        .catch(e => console.error(e))
}

function findUser(evt) {
    evt.preventDefault();
    console.log("test")
    const result = myPersonData.filter(person => {
        return person.firstName === document.getElementById("search-input").value || //lastName i stedet for firstName vil gøre at man kan søge på lastName i stedet for.
            person.email === document.getElementById("search-input").value //Gør at man kan søge på email
    })
    console.log(result)
    makeRows(result)
}

function makeRows(person){
    //Gør at table bliver synligt ved søgning af person og forsvinder igen ved ny søgning.
    document.getElementById("table").style.display = "block"
    const trows = person.map(p =>`
    <tr>
        <td>${encode(p.firstName)}</td>
        <td>${encode(p.lastName)}</td> 
        <td>${encode(p.email)}</td>      
        <td>${encode(p.city)}</td>
        <td>${p.hobbies.map((hobby) => {return hobby.hobbyName}).join("<br>")}</td> <!-- encode slette for at få det på to linjer -->
        <!-- map funktionen: (hobby)= parameter i en "normal" funktion => (Arrow) er der for at indikere at vi har med en funktion at gøre.
         Der er ikke sat nogen navn til funktionen da det er en anonym funktion og som kun skal benyttes til dette ene formål og dermed ikke skal 
         kaldes til andre steder. Detfor undlader man at give den et navn. -->
    </tr>
    `).join("\n")
    document.getElementById("search-body").innerHTML = trows
}