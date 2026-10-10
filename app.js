function showScreen(screenName) {

    document.getElementById("home").style.display = "none";

    document.querySelectorAll(".screen").forEach(screen => {

        screen.style.display = "none";

    });

    document.getElementById(screenName)

        .style.display = "block";

    if (screenName === "weather") {

        loadWeather();

    }

    if (screenName === "tube") {

        loadTube();

    }

    if (screenName === "spotify") {

        loadSpotify();

    }

    if (screenName === "radar") {

        loadRadar();

    }

    if (screenName === "dashboard") {

        loadDashboard();

    }

}

function goHome() {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.style.display = "none";

    });

    document.getElementById("home")

        .style.display = "block";

}

function loadDashboard() {

    document.getElementById("dashboard-content")

        .innerHTML = `

        <h2>Dashboard</h2>

        <p>Weather Summary</p>

        <p>Tube Summary</p>

        <p>Spotify Summary</p>

        <p>Flights Today</p>

    `;

}
