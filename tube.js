
const TFL_API_KEY =

    "a57ffebedc754a10b7afe72443393861";

async function loadTube() {

    try {

        const response =

            await fetch(

                `https://api.tfl.gov.uk/StopPoint/940GZZLUCLP/Arrivals?app_key=${TFL_API_KEY}`

            );

        const data =

            await response.json();

        data.sort(

            (a, b) =>

                a.timeToStation -

                b.timeToStation

        );

        const northbound =

            data

                .filter(

                    train =>

                        train.platformName &&

                        train.platformName.includes(

                            "Northbound"

                        )

                )

                .slice(0, 3);

        const southbound =

            data

                .filter(

                    train =>

                        train.platformName &&

                        train.platformName.includes(

                            "Southbound"

                        )

                )

                .slice(0, 3);

        let northHtml = "";

        let southHtml = "";

        northbound.forEach(train => {

            northHtml += `

                <div class="train-card">

                    <strong>

                        ${train.destinationName}

                    </strong>

                    <br>

                    ${Math.max(

                        1,

                        Math.floor(

                            train.timeToStation / 60

                        )

                    )} mins

                </div>

            `;

        });

        southbound.forEach(train => {

            southHtml += `

                <div class="train-card">

                    <strong>

                        ${train.destinationName}

                    </strong>

                    <br>

                    ${Math.max(

                        1,

                        Math.floor(

                            train.timeToStation / 60

                        )

                    )} mins

                </div>

            `;

        });

        document.getElementById(

            "tube-content"

        ).innerHTML = `

            <h2>Clapham North</h2>

            <div class="tube-grid">

                <div class="tube-column">

                    <h3>Northbound</h3>

                    ${northHtml}

                </div>

                <div class="tube-column">

                    <h3>Southbound</h3>

                    ${southHtml}

                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        document.getElementById(

            "tube-content"

        ).innerHTML =

            "Unable to load TfL data.";

    }

}
