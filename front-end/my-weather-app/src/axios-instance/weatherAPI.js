import axios from 'axios';
const axiosWeather = axios.create({
    baseURL:"https://weather-app-michael.herokuapp.com/",
    timeout:5000,
})

export default axiosWeather;