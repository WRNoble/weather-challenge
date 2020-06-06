const https = require('https');
const api = require('./api.json');

function printWeather(weather) {
    const message = `Temperature in ${weather.location.city} is currently ${weather.current_observation.temp_f}F`;
    console.log(message);
}

function printError(error) {
    console.error(error.message);
}

function get(query) {
    const readableQuery = query.replace('_', ' ');
    try {
        const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, 
        response => {
                if(response.statusCode === 200) {
                let body = "";
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    const weather = JSON.parse(body);
                    printWeather(weather);
                });
                } else {
                    const queryError = new Error(`The location "${readableQuery}" was not found.`);
                }
        });
        
    } catch(error) {

    }
}

module.exports.get = get;