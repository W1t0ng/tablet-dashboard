const OPENWEATHER_API_KEY = "aaeabdba05019d0f7e3d78812930efbb";

async function loadWeather() {

    try {

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${OPENWEATHER_API_KEY}`

        );

        const data = await response.json();

        document.getElementById("weather-content")

            .innerHTML = `

            <h2>${data.name}</h2>

            <h1>${Math.round(data.main.temp)}°C</h1>

            <p>${data.weather[0].description}</p>

            <p>Humidity ${data.main.humidity}%</p>

            <p>Wind ${data.wind.speed} m/s</p>

        `;

    } catch {

        document.getElementById("weather-content")

            .innerHTML = "Unable to load weather";

    }

}
