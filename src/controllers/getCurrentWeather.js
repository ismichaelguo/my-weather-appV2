const fetch = require('node-fetch');
const cache = new Map();


async function getCurrentWeather (ctx){
    const WEATHER_API_URL = "https://api.weatherbit.io/v2.0/forecast/hourly"
    const {cities} = ctx.query;

    if(cache.has(cities)){
        ctx.body = cache.get(cities)
        return;
    }
    APP_ID=process.env.PHOTO_KEY;
    const weatherRequestUrl = `${WEATHER_API_URL}?key=${APP_ID}&city=${cities}`;
    const res = await fetch(weatherRequestUrl);

    console.log("res",res);

    if(res.ok){
        const weatherRes = await res.json();
        ctx.body = weatherRes;
        cache.set(cities,weatherRes);
    }
    if(res.status ===401){
        console.error(`weather request: ${WEATHER_API_URL}?q=${cities} is Unauthorised`)
        ctx.body = "Internal Server Error";
        ctx.status = 500;
    }



}

module.exports = getCurrentWeather;