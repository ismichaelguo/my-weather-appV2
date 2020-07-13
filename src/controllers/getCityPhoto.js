const cache = new Map();
const fetch = require('node-fetch');

async function getCityPhoto (ctx){

    const {cities} = ctx.query;
    const PHOTO_API_URL = "https://api.unsplash.com/search/photos/";
    const API_KEY="BHJyBbJMrYRBqHzYuivvgBVspMShqGua5e0W1BvBkrA";

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