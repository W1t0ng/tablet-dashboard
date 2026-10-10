function showScreen(screenName) {

    document.getElementById("home").style.display = "none";

    document.querySelectorAll(".screen").forEach(screen => {

        screen.style.display = "none";

    });

    document.getElementById(screenName).style.display = "block";

}

function goHome() {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.style.display = "none";

    });

    document.getElementById("home").style.display = "block";

}

 
