function usernameValidate(e) {
    // var username = document.getElementsByClassName('username').value;
    
    var username = e.target.value; // the textbox (e.target), entire string of textbox (value)

    var length = username.length >= 8;
    var firstCharacter = /^[a-zA-Z]/ /* ^ denotes the first character */
    var alphanumeric = /[a-zA-Z0-9]{3,}$/ /* $ denotes the end of the string */

    var usernameTest = firstCharacter + alphanumeric;

    console.log(username);

    if (!firstCharacter.test(username) || !alphanumeric.test(username) || !length) {
        // alert('Invalid username. Username should contain.....');
        e.target.setCustomValidity("Invalid Username");
    }
    else {
        e.target.setCustomValidity(""); // pass in strings
    }
}

var textbox = document.getElementById('username-textbox');
textbox.addEventListener("input", usernameValidate); // passes event object (usernameValidate())

var ptextbox = document.getElementById('password-textbox');
ptextbox.addEventListener("input", passwordValidate)

function passwordValidate(e) { // can use e again bc e defined in one scope of the function
    // var password = document.getElementById('password').value;

    var password = e.target.value;

    var length = password.length >= 8;
    var upperCase = /^[A-Z]+/
    var number = /d+/
    var spcharacter = /[/*\-+!@#$^&~[\]]+$/

    
    if (!passwordregex.test(upperCase) || !passwordregex.test(number) || !passwordregex.test(spcharacter) || !length) {
        e.target.setCustomValidity("Invalid Password");
    }
    else {
        e.target.setCustomValidity("");
    }
}

// alert('Invalid password. Password should contain.....');
// use PHP to send messages back rather than alerts? 