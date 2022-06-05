const fetch = require('node-fetch');

const WEATHER_API_KEY = "af37b0acb771a412e9351fe8e5f502a8";
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = (city, callback) => {

    const weatherURL = `${CURRENT_WEATHER_URL}${city}&appid=${WEATHER_API_KEY}`


    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            callback(data);
            // return data; // will return undefined
        })

}


module.exports = getWeather;