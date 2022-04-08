/**
 * @author : FeryaelJustice
 * RENAME sampleEnvironment.json file to environment.json and put your API KEY in it.
 */

initProgram();

function initProgram() {
    readTextFile("environment.json", async function (text) {
        let json = JSON.parse(text);
        console.log(json)
        const record = await fetchData(json);
        try {
            printData(record);
        } catch (err) {
            console.log(err);
        }
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

async function fetchData(json) {
    let API_KEY = json.api_key;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=${API_KEY}`);
    return await res.json();
}

function printData(record) {
    document.getElementById("name").innerHTML = record.name;
    document.getElementById("main").innerHTML = record.weather[0].main;
    document.getElementById("description").innerHTML = record.weather[0].description.toUpperCase();
    document.getElementById("temp").innerHTML = record.main.temp;
}