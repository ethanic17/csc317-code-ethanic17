function pageCheck() {
    if (document.location.pathname === "/") {
        var home = document.getElementById("home");
        home.classList.add("active"); 
    }
}

pageCheck();