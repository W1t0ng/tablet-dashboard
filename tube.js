const TFL_APP_KEY = "a57ffebedc754a10b7afe72443393861";

async function loadTube() {

    try {

        document.getElementById("tube-content").innerHTML =

            "<p>Loading Tube data...</p>";

        const response = await fetch(

            `https://api.tfl.gov.uk/StopPoint/940GZZLUCLP/Arrivals?app_key=${TFL_APP_KEY}`

        );

        const data = await response.json();

        data.sort((a, b) => a.timeToStation - b.timeToStation);

        const northbound = data

            .filter(train =>

                train.platformName &&

                train.platformName.includes("Northbound"))

            .slice(0, 3);

        const southbound = data

            .filter(train =>

                train.platformName &&

                train.platformName.includes("Southbound"))

            .slice(0, 3);

        let northHtml = "";

        let southHtml = "";

        northbound.forEach(train => {

            northHtml += `

                <div class="train-card">

                    <div class="destination">

                        ${train.destinationName}

                    </div>

                    <div class="arrival-time">

                        ${Math.max(1, Math.floor(train.timeToStation / 60))} mins

                    </div>

                </div>

            `;

        });

        southbound.forEach(train => {

            southHtml += `

                <div class="train-card">

                    <div class="destination">

                        ${train.destinationName}

                    </div>

                    <div class="arrival-time">

                        ${Math.max(1, Math.floor(train.timeToStation / 60))} mins

                    </div>

                </div>

            `;

        });

        document.getElementById("tube-content").innerHTML = `

            <h2>Clapham North</h2>

            <div class="tube-grid">

                <div class="tube-column">

                    <h3>Northbound</h3>

                    ${northHtml || "<p>No trains found</p>"}

                </div>

                <div class="tube-column">

                    <h3>Southbound</h3>

                    ${southHtml || "<p>No trains found</p>"}

                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        document.getElementById("tube-content").innerHTML = `

            <h2>Clapham North</h2>

            <p>Unable to load live TfL data.</p>

        `;

    }

}
 
