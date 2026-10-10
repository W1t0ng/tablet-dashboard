const SPOTIFY_CLIENT_ID =

    "be2d438b383541cdb7e09a2a57f8a15a";

let spotifyToken = "";

function spotifyLogin() {

    const redirectUri =

        window.location.origin +

        window.location.pathname;

    const scopes =

        "user-read-currently-playing user-read-playback-state";

    const authUrl =

        "https://accounts.spotify.com/authorize" +

        "?client_id=" + SPOTIFY_CLIENT_ID +

        "&response_type=token" +

        "&redirect_uri=" +

        encodeURIComponent(redirectUri) +

        "&scope=" +

        encodeURIComponent(scopes);

    window.location.href = authUrl;

}

function getSpotifyToken() {

    const hash =

        window.location.hash;

    if (

        hash &&

        hash.includes("access_token")

    ) {

        const params =

            new URLSearchParams(

                hash.substring(1)

            );

        spotifyToken =

            params.get("access_token");

        localStorage.setItem(

            "spotify_token",

            spotifyToken

        );

        history.replaceState(

            {},

            document.title,

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

function loadSpotify() {

    getSpotifyToken();

    if (!spotifyToken) {

        document.getElementById(

            "spotify-content"

        ).innerHTML = `

            <h2>Spotify</h2>

            <p>

                Not Connected

            </p>

            <button onclick="spotifyLogin()">

                Connect Spotify

            </button>

        `;

        return;

    }

    document.getElementById(

        "spotify-content"

    ).innerHTML = `

        <h2>

            Spotify Connected

        </h2>

        <p>

            Authentication Successful

        </p>

    `;

}
