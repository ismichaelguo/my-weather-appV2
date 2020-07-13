"use strict"
const Router = require('koa-router');
const router = new Router();

const getCurrentWeather = require("../controllers/getCurrentWeather");
const getForecastWeather = require("../controllers/getForecastWeather");
const getCityPhoto = require("../controllers/getCityPhoto");

router.get('/forecast//hourly',getCurrentWeather);
router.get('/forecast/daily',getForecastWeather);
router.get('/search/photos',getCityPhoto);

module.exports = router;




