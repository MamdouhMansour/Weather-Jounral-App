/* Global Variables */
const API_KEY = "12069046be7b3bec6cfefe3a43889813";
const getWeatherDataEndPoint = "/getweatherdata";
const postWeatherDataEndPoint = "/addweatherdata";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//event 
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const feelings = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;

    getOpenMapWetherDataByZipCode(baseUrl,zipCode,API_KEY)
        .then((data) =>
            postWeatherData(postWeatherDataEndPoint, { "temperature": data.main.temp, "date": newDate, "feelings": feelings }))
        .then(() => getWetherJournalData());
}

//Get weather data from openMapWehater APP
const getOpenMapWetherDataByZipCode = async (baseUrl, zipCode, apiKey) => {
    const openMapWehaterUri = `${baseUrl}zip=${zipCode},us&appid=${apiKey}&units=metric`;

    const res = await fetch(openMapWehaterUri);
    try {
        const data = await res.json();
        return data;    
    } catch (error) {
        console.log("error", error);
    }
}

//Add data to weather journal app

const postWeatherData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const postedData = await res.json();
        return postedData;
    } catch (error) {
        console.log("error", error);
    }
}

//Get weather request

const getWetherJournalData = async () => {
    const res = await fetch(getWeatherDataEndPoint);
    try {
        const data = await res.json();
        document.getElementById('temp').innerHTML = "Current Temperatuer is: " + data[0].temperature;
        document.getElementById('date').innerHTML = "Date: " + data[0].date;
        document.getElementById('content').innerHTML = "User Feeling: " + data[0].feelings;
    } catch (error) {
        console.log("error", error);
    }
}