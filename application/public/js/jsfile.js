function usernameValidate() {
    var username = document.getElementsByClassName('username').value;
    
    var length = username.length >= 8;
    var firstCharacter = /^[a-zA-Z]/ /* ^ denotes the first character */
    var alphanumeric = /[a-zA-Z0-9]{3,}$/ /* $ denotes the end of the string */


    var numbers 



    if (!username.test(username)) {
        alert('Invalid username. Username should contain.....');
        return false;
    }



    return true;
}

function passwordValidate() {
    var password = document.getElementById('password').value;

    
    if (!password.test(password)) {
        alert('Invalid password. Password should contain.....');
        return false;
    }
}


// use PHP to send messages back rather than alerts? 