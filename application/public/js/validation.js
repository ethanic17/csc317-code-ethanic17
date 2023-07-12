var textbox = document.getElementById('username-textbox');
textbox.addEventListener("input", usernameValidate); // passes event object (usernameValidate())

var ptextbox = document.getElementById('password-textbox');
ptextbox.addEventListener("input", passwordValidate);

var rtextbox = document.getElementById('retype-textbox');
rtextbox.addEventListener("input", comparePassword);


function usernameValidate(e) {
    // var username = document.getElementsByClassName('username').value;
    
    var username = e.target.value; // the textbox (e.target), entire string of textbox (value)

    var firstCharacter = /^[a-zA-Z]/ /* ^ denotes the first character */
    var alphanumeric = /[a-zA-Z0-9]{3,}$/ /* $ denotes the end of the string */

    var usernameTest = firstCharacter + alphanumeric;

    console.log(username);

    if (!firstCharacter.test(username) || !alphanumeric.test(username)) {
        // alert('Invalid username. Username should contain.....');
        e.target.setCustomValidity("Invalid Username (should start with a letter & have 3 alphanumeric characters");
    }
    else {
        e.target.setCustomValidity(""); // pass in strings
    }
}

function passwordValidate(e) { // can use e again bc e defined in one scope of the function
    // var password = document.getElementById('password').value;

    var password = e.target.value;

    var length = password.length >= 8;
    var upperCase = /[A-Z]+/
    var number = /\d+/
    var spcharacter = /[/*\-+!@#$^&~[\]]+/

    
    if (!upperCase.test(password) || !number.test(password) || !spcharacter.test(password) || !length) {
        e.target.setCustomValidity("Invalid Password (should be 8+ characters, have an upper case letter, a number, and a special character");
    }
    else {
        e.target.setCustomValidity("");
    }
}

function comparePassword(e) {
    var passwordMatch = e.target.value;
    // console.log(passwordMatch);
    var password = "delta";

    if (passwordMatch != password) {
        e.target.setCustomValidity("Passwords do not match!");
    }
    else {
        e.setCustomValidity("");
    }
}

// alert('Invalid password. Password should contain.....');
// use PHP to send messages back rather than alerts? 