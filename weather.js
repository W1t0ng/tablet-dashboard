const apiKey = "aaeabdba05019d0f7e3d78812930efbb";

async function loadWeather() {

    const response = await fetch(

        `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`

    );

    const data = await response.json();

    document.getElementById("weather-content").innerHTML = `

        <h2>${data.name}</h2>

        <p>Temperature: ${data.main.temp}°C</p>

        <p>Conditions: ${data.weather[0].description}</p>

        <p>Humidity: ${data.main.humidity}%</p>

        <p>Wind: ${data.wind.speed} m/s</p>

    `;

}
