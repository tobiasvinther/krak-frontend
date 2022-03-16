
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
        }if(pwd.length < 5){
            document.getElementById("length").innerText = "Password must be at least 5 characters"
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




