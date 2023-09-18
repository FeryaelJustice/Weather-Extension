/**
 * @author : FeryaelJustice
 * RENAME sampleEnvironment.json file to environment.json and put your API KEY in it.
 */

initProgram();

function initProgram() {
    readTextFile("environment.json", async function (text) {
        let json = JSON.parse(text);
        fetchData(json);
    });
}

async function readTextFile(file, callback) {
    ;
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                callback(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}

function fetchData(json) {
    const API_KEY = json.api_key;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Your latitude: " + position.coords.latitude, " / Your longitude: " + position.coords.longitude);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API_KEY}`, {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }),
            }).then(res => {
                if (res.status === 200) {
                    console.log("Success on fetching data")
                    return res.json();
                }
                else {
                    console.error("Failed on fetching data")
                    return null;
                }
            }).then(record => {
                printData(record);
            }
            ).catch(err => {
                console.log(`Error fetching data: ${err}`);
            });
        });
    } else {
        console.warn("Geolocation is not supported by this browser.");

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=${API_KEY}`, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        }).then(res => {
            if (res.status === 200) {
                console.log("Success on fetching data")
                return res.json();
            }
            else {
                console.error("Failed on fetching data")
                return null;
            }
        }).then(record => {
            printData(record);
        }
        ).catch(err => {
            console.log(`Error fetching data: ${err}`);
        });
    }

}

function printData(record) {
    document.getElementById("name").innerHTML = record.name;
    document.getElementById("main").innerHTML = record.weather[0].main;
    document.getElementById("description").innerHTML = record.weather[0].description.toUpperCase();
    document.getElementById("temp").innerHTML = record.main.temp + "°C";
}