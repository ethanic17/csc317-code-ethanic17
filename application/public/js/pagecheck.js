// javascript function to check what page the user is on, and then add active class to navbar

function pageCheck() {
    if (document.location.pathname === "/") {
        var home = document.getElementById("home");
        home.classList.add("active"); 
    }

    if (document.location.pathname === "/login") {
        var login = document.getElementById("login");
        login.classList.add("active"); 
    }

    if (document.location.pathname === "/registration") {
        var registration = document.getElementById("register");
        registration.classList.add("active"); 
    }

    if (document.location.pathname === "/postvideo") {
        var postvideo = document.getElementById("postvideo");
        postvideo.classList.add("active"); 
    }

    if (document.location.pathname === "/viewpost") {
        var viewpost = document.getElementById("viewpost");
        viewpost.classList.add("active"); 
    }
}

pageCheck();