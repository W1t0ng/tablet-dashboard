function showScreen(screenName) {

    document.getElementById("home").style.display = "none";

    document.querySelectorAll(".screen").forEach(screen => {

        screen.style.display = "none";

    });

    document.getElementById(screenName)

        .style.display = "block";

    if (screenName === "dashboard") {

        loadDashboard();

    }

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

        <div class="dashboard-card">

            Weather Connected

        </div>

        <div class="dashboard-card">

            TfL Connected

        </div>

        <div class="dashboard-card">

            Spotify Connected

        </div>

        <div class="dashboard-card">

            Sky Radar Connected

        </div>

    `;

}
