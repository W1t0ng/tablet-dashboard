function showScreen(screenName) {

    const home = document.getElementById("home");

    if (home) {

        home.style.display = "none";

    }

    document.querySelectorAll(".screen").forEach(screen => {

        screen.style.display = "none";

    });

    const selectedScreen =

        document.getElementById(screenName);

    if (!selectedScreen) {

        console.error(

            "Screen not found:",

            screenName

        );

        return;

    }

    selectedScreen.style.display = "block";

    if (

        screenName === "weather" &&

        typeof loadWeather === "function"

    ) {

        loadWeather();

    }

    if (

        screenName === "tube" &&

        typeof loadTube === "function"

    ) {

        loadTube();
    }

    if (

        screenName === "spotify" &&

        typeof loadSpotify === "function"

    ) {

        loadSpotify();

    }

    if (

        screenName === "dashboard" &&

        typeof loadDashboard === "function"

    ) {

        loadDashboard();

    }
    

}

function goHome() {

    document.querySelectorAll(".screen")

        .forEach(screen => {

            screen.style.display = "none";

        });

    document.getElementById("home")

        .style.display = "block";

}

function loadDashboard() {

    document.getElementById(

        "dashboard-content"

    ).innerHTML = `

        <div class="dashboard-card">

            Weather API Connected

        </div>

        <div class="dashboard-card">

            TfL API Ready

        </div>

    `;

}
