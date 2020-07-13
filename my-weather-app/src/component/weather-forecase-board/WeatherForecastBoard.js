import React, { Fragment } from "react";
import Humidity from "../../asset/image/water.svg";
import minTemp from "../../asset/image/cold.svg";
import maxTemp from "../../asset/image/high-temperature.svg";

import "./weather-forecast-board.scss";

class WeatherForecastBoard extends React.Component {
  getDay = (date) => {
    const Day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let whichDay = new Date(Date.parse(date.replace(/-/g, "/")));
    return <h4>{Day[whichDay.getDay()]}</h4>;
  };

  getDegree = (temp) => {
    const newTemp = Math.floor(temp);
    return <p>{`${newTemp}°C`} </p>;
  };

  getPercent = (degree) => {
    return <p>{`${degree}%`}</p>;
  };

  getForecastBoard = (props) => {
    const WEATHER_DATA = this.props.weather.data || [];
    //make sure already get data from api
    if (WEATHER_DATA.length > 0) {
      const furtherDays = [
        WEATHER_DATA[0],
        WEATHER_DATA[1],
        WEATHER_DATA[2],
        WEATHER_DATA[3],
        WEATHER_DATA[4],
        WEATHER_DATA[5],
        WEATHER_DATA[6],
      ];

      return (
        <div className="days">
          <div className="days__container">
            {furtherDays.map((day) => (
              <div className="weatherCard" key={day.moonrise_ts}>
                {this.getDay(day.datetime)}
                <div className="weatherCard__humidity">
                  <img src={Humidity} alt="" />
                  {this.getPercent(day.rh)}
                </div>
                <img
                  className="weatherCard__icon"
                  src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                  alt=""
                />
                <div className="weatherCard__minTemp">
                  <img src={minTemp} alt="" />
                  {this.getDegree(day.min_temp)}
                </div>
                <div className="weatherCard__maxTemp">
                  <img src={maxTemp} alt="" />
                  {this.getDegree(day.max_temp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  render() {
    return <Fragment>{this.getForecastBoard()}</Fragment>;
  }
}

export default WeatherForecastBoard;
