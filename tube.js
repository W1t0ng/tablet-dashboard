const TFL_API_KEY = "a57ffebedc754a10b7afe72443393861";

async function loadTube() {

    try {

        const response = await fetch(

            `https://api.tfl.gov.uk/StopPoint/940GZZLUCPN/Arrivals?app_key=${TFL_API_KEY}`

        );

        const data = await response.json();

        document.getElementById("tube-content").innerHTML =

            "<pre>" +

            JSON.stringify(data, null, 2) +

            "</pre>";

        console.log(data);

    }

    catch (error) {

        console.error(error);

    }

}
