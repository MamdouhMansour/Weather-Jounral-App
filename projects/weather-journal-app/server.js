// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
    console.log(`Example app listening at http://localhost:${port}`);
}
// Setup Server
//Get weather data route
app.get('/getweatherdata', getWeatherData);

function getWeatherData(req, res){
    console.log("getWeatherData requested = > " + projectData)
    res.send(projectData.slice(-1));
}


// post weather data route
app.post('/addweatherdata', addWeatherData);

function addWeatherData(req, res){
    console.log("getWeatherData requested = > " + projectData)
    console.log("Weather Data Are ==> " + req.body);
    
    newWeatherEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        feelings: req.body.feelings
    }

    projectData.push(newWeatherEntry);
    res.send(projectData);
    console.log("Weather Data Are ==> " + projectData[0].temperature +  projectData[0].date +  projectData[0].feelings);
}
