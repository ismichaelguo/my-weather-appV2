import axios from 'axios';
const axiosWeather = axios.create({
    baseURL:process.env || "http://localhost:8080",
    timeout:5000,
})

export default axiosWeather;