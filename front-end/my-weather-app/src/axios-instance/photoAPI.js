import axios from 'axios';
const axiosPhoto = axios.create({
    baseURL:"https://weather-app-michael.herokuapp.com/",
    timeout:5000,
})

export default axiosPhoto;