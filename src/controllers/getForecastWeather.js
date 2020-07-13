const fetch = require('node-fetch');
const cache = new Map();

async function getForecastWeather (ctx){
    const WEATHER_API_URL = "https://api.weatherbit.io/v2.0/forecast/daily"
    console.log("query",ctx.query)
    const {cities} = ctx.query;
    if(cache.has(cities)){
        ctx.body = cache.get(cities);
        return;
    }
    APP_ID=process.env.WEATHER_KEY;
    const weatherRequestUrl = `${WEATHER_API_URL}?key=${APP_ID}&city=${cities}`;
    const res = await fetch(weatherRequestUrl);

    if(res.ok){
        const WeatherRes = await res.json();
        ctx.body = WeatherRes;
        cache.set(cities,WeatherRes);
    }

    if(res.status ===401){
        console.error(`weather request: ${WEATHER_API_URL}?cities=${cities} is Unauthorised`)
        ctx.body = "Internal Server Error";
        ctx.status = 500;
    }




}

module.exports = getForecastWeather;