const SPOTIFY_CLIENT_ID = "be2d438b383541cdb7e09a2a57f8a15a";

let spotifyToken = "";

function spotifyLogin() {

    const redirectUri =

        window.location.origin +

        window.location.pathname;

    const scopes =

        "user-read-playback-state " +

        "user-read-currently-playing " +

        "user-modify-playback-state";

    const authUrl =

        "https://accounts.spotify.com/authorize" +

        "?client_id=" + SPOTIFY_CLIENT_ID +

        "&response_type=token" +

        "&redirect_uri=" + encodeURIComponent(redirectUri) +

        "&scope=" + encodeURIComponent(scopes);

    window.location.href = authUrl;

}

function getSpotifyToken() {

    const hash = window.location.hash;

    if (hash.includes("access_token")) {

        spotifyToken =

            hash.split("&")[0]

                .split("=")[1];

        localStorage.setItem(

            "spotify_token",

            spotifyToken

        );

        history.replaceState(

            null,

            null,

            window.location.pathname

        );

    }

    else {

        spotifyToken =

            localStorage.getItem(

                "spotify_token"

            );

    }

}

async function loadSpotify() {

    getSpotifyToken();

    if (!spotifyToken) {

        document.getElementById("spotify-content")

            .innerHTML = `

            <button onclick="spotifyLogin()">

                Connect Spotify

            </button>

        `;

        return;

    }

    document.getElementById("spotify-content")

        .innerHTML = `

        <div id="spotify-now-playing">

            Loading Spotify...

        </div>

    `;

    loadCurrentTrack();

}

async function loadCurrentTrack() {

    try {

        const response = await fetch(

            "https://api.spotify.com/v1/me/player/currently-playing",

            {

                headers: {

                    Authorization:

                        "Bearer " + spotifyToken

                }

            }

        );

        const data = await response.json();

        const image =

            data.item.album.images[0].url;

        document.getElementById(

            "spotify-now-playing"

        ).innerHTML = `

            ${image}

            <h2>${data.item.name}</h2>

            <h3>

                ${data.item.artists[0].name}

            </h3>

            <div class="spotify-controls">

                <button onclick="previousTrack()">

                    ◀◀

                </button>

                <button onclick="pausePlayback()">

                    ⏸

                </button>

                <button onclick="nextTrack()">

                    ▶▶

                </button>

            </div>

            <hr>

            <h3>Playback Device</h3>

            <select id="deviceSelect">

            </select>

            <hr>

            <input

                id="searchBox"

                placeholder="Search Spotify">

            <button onclick="searchSpotify()">

                Search

            </button>

            <div id="searchResults">

            </div>

        `;

        loadDevices();

    } catch {

        document.getElementById(

            "spotify-now-playing"

        ).innerHTML =

            "No active Spotify session found.";

    }

}

async function loadDevices() {

    const response = await fetch(

        "https://api.spotify.com/v1/me/player/devices",

        {

            headers: {

                Authorization:

                    "Bearer " + spotifyToken

            }

        }

    );

    const data =

        await response.json();

    const select =

        document.getElementById(

            "deviceSelect"

        );

    if (!select) return;

    select.innerHTML = "";

    data.devices.forEach(device => {

        const option =

            document.createElement("option");

        option.value = device.id;

        option.textContent =

            device.name;

        select.appendChild(option);

    });

}

async function searchSpotify() {

    const searchTerm =

        document.getElementById(

            "searchBox"

        ).value;

    const response =

        await fetch(

            `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`,

            {

                headers: {

                    Authorization:

                        "Bearer " + spotifyToken

                }

            }

        );

    const data =

        await response.json();

    let html = "";

    data.tracks.items.forEach(track => {

        html += `

            <div class="spotify-result">

                <strong>

                    ${track.name}

                </strong>

                <br>

                ${track.artists[0].name}

                <br><br>

                <button onclick="playTrack('${track.uri}')">

                    Play

                </button>

            </div>

        `;

    });

    document.getElementById(

        "searchResults"

    ).innerHTML = html;

}

async function playTrack(uri) {

    const deviceId =

        document.getElementById(

            "deviceSelect"

        ).value;

    await fetch(

        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,

        {

            method: "PUT",

            headers: {

                Authorization:

                    "Bearer " + spotifyToken,

                "Content-Type":

                    "application/json"

            },

            body: JSON.stringify({

                uris: [uri]

            })

        }

    );

}

async function pausePlayback() {

    await fetch(

        "https://api.spotify.com/v1/me/player/pause",

        {

            method: "PUT",

            headers: {

                Authorization:

                    "Bearer " + spotifyToken

            }

        }

    );

}

async function nextTrack() {

    await fetch(

        "https://api.spotify.com/v1/me/player/next",

        {

            method: "POST",

            headers: {

                Authorization:

                    "Bearer " + spotifyToken

            }

        }

    );

}

async function previousTrack() {

    await fetch(

        "https://api.spotify.com/v1/me/player/previous",

        {

            method: "POST",

            headers: {

                Authorization:

                    "Bearer " + spotifyToken

            }

        }

    );

}
