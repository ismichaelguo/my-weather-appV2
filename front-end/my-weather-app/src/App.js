import React from "react";
import "./app.scss";
import { FiSearch } from "react-icons/fi";
import CityCardContainer from "./component/city-card-container/CityCardContainer";
import WeatherForecastBoard from "./component/weather-forecase-board/WeatherForecastBoard";
import CurrentWeatherBoard from "./component/current-weather-board/CurrentWeatherBoard";
import axiosWeather from './axios-instance/weatherAPI';
import axiosPhoto from './axios-instance/photoAPI';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCity: [],
      photo: [],
      imageId: 0,
      foreCastWeather: [],
      currentWeather: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let cityTest = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    let isCity = cityTest.test(e.target.elements[0].value);

    let city = e.target.elements[0].value || "Sydney";
    //splash photo api
    axiosPhoto({
      url:'/search/photos',
      method:"GET",
      params:{"cities":city}
    }).then(res=>res.data)
    .then(data=>{

      const response_photo = data;
      const nameError = document.getElementById("nameError");
      const limitError = document.getElementById("limitError");
  
      let cityItem;
      //store input cities into this.state.searchCity only when the photo data exited in splash api
      if (response_photo.results.length > 0) {
        cityItem = {
          id: new Date(),
          city: city,
          cityImage: response_photo.results[0].urls.small,
        };
        let cityNumber = this.state.searchCity.length;
        //the maximum city number is 4
        if (cityNumber < 4) {
          this.setState((prevState) => ({
            searchCity: prevState.searchCity.concat(cityItem),
          }));
        } else if (isCity === true && cityNumber > 3) {
          limitError.style.height = "2rem";
          setTimeout(() => (limitError.style.height = "0rem"), 4000);
        } else if (isCity === false) {
          nameError.style.height = "2rem";
          setTimeout(() => (nameError.style.height = "0rem"), 4000);
        }
      } else {
        nameError.style.height = "2rem";
        setTimeout(() => (nameError.style.height = "0rem"), 4000);
      }
    }).catch(err=>console.log(err));

  };

  getWeatherData = async (e) => {
    // forecast weather api
    const city = e.target.id;

    //enlarge photo while click
    const selectedCity = document.getElementById(city);
    selectedCity.style.transform = "scale(1.1)";
    //request for forecast weather
    axiosWeather({
      url:'/forecast/daily',
      method:"GET",
      params:{"cities":city},
    }).then(res=>res.data)
    .then(data=>{
      const ForeCastResponse = data;
      this.setState({
        foreCastWeather: ForeCastResponse,
      });
    }).catch(err=>console.log(err));

    //current weather api
    axiosWeather({
      url:'/forecast//hourly',
      method:"GET",
      params:{"cities":city}
    }).then(res=>res.data)
    .then(data=>{
      const CurrentResponse = data;
      this.setState({
        currentWeather: CurrentResponse,
      });
    }).catch(err=>console.log(err));

  };

  deleteCard = (cardIndex) => {
    let prevCities = new Set(this.state.searchCity);
    //return deleted cities
    let updatedCities = new Set(this.state.searchCity.splice(cardIndex, 1));
    //get the different set with prev cities,which are the cities want to remain
    let filterCities = Array.from(
      new Set([...prevCities].filter((x) => !updatedCities.has(x)))
    );
    this.setState({
      searchCity: filterCities,
    });
  };

  render() {
    return (
      <div className="app">
        <div className="app__container">
          <section className="app__container__left">
            {/* search bar */}
            <FiSearch className="search-icon" />
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Search new place"></input>
              <button onClick={this.getData}>Search</button>
            </form>
            <div className="app__container__error" id="nameError">
              It is not a Valid City Name!
            </div>
            <div className="app__container__error" id="limitError">
              You only can add 4 cities!
            </div>
            {/* title */}
            <h4>
              Weather <span>Forecast</span>
            </h4>
            {/* city cards */}
            <CityCardContainer
              cities={this.state.searchCity}
              imageId={this.state.imageId}
              photo={this.state.photo}
              getWeatherData={this.getWeatherData}
              selectedCity={this.state.foreCastWeather}
              deleteCard={this.deleteCard}
            />
            {/* Weather Forecast Board */}
            <WeatherForecastBoard weather={this.state.foreCastWeather} />
          </section>
          <section className="app__container__right">
            {/* Current Weather Board */}
            <CurrentWeatherBoard weather={this.state.currentWeather} />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
