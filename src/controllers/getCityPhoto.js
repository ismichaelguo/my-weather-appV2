const cache = new Map();
const fetch = require('node-fetch');
const config = require('config'); // 
const PHOTO_KEY = config.get('API.PHOTO_KEY');


async function getCityPhoto (ctx){

    const {cities} = ctx.query;
    const PHOTO_API_URL = "https://api.unsplash.com/search/photos/";
    const API_KEY=PHOTO_KEY || process.env.PHOTO_KEY;
    //store the city data for later use
    if(cache.has(cities)){
        ctx.body = cache.get(cities);
        return;
    }
    const weatherRequestUrl = `${PHOTO_API_URL}?client_id=${API_KEY}&query=${cities}&orientation=landscape`;
    const res = await fetch(weatherRequestUrl);
    console.log("res",res)

    if(res.ok){
        const weatherRes = await res.json();
        ctx.body = weatherRes;
        cache.set(cities,weatherRes);
    }

    if(res.status === 401){
        ctx.body = "Internal Server Error";
        ctx.status = 500;
        console.error(`weather request: ${PHOTO_API_URL}&query=${cities} is not authorized!`)
    }



}

module.exports = getCityPhoto;