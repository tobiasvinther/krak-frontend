export function getUser() {
    //document.getElementById("id-error").innerText = "" //reset error message
    const id = 2 //dummy data
    console.log("Start: getUser")
    fetch("https://jsonplaceholder.typicode.com/users/" + id) //dummy data
        .then(res => {
            if (!res.ok) {
                return Promise.reject("Error :" + res.status) //error handling
            }
            return res.json() //get it as json
        })
        .then(data => { //now we have the data as json and we can start to use it
            document.getElementById("id-name").innerText = data.name
            document.getElementById("id-phone").innerText = data.phone
            document.getElementById("id-street").innerText = data.address.street
            document.getElementById("id-city").innerText = data.address.city
        })
        .catch(err => {
            //document.getElementById("id-error").innerText = "User doesn't exist"
            console.error("Error caught: " + err)
        }) //catch errors
        .finally(e => console.log("End: getUser"))
}