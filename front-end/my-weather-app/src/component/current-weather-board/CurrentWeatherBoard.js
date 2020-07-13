import React, { Fragment } from "react";
import "./current-weather-board.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class CurrentForecastBoard extends React.Component {
  getDate = (date) => {
    if (date !== undefined) {
      const Day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
      const Month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      //parse date time from json format
      let whichDate = new Date(Date.parse(date));
      return (
        <Fragment>
          {/*get date,day,month respectively*/}
          {Day[whichDate.getDay(date)]},{whichDate.getDate(date)}{" "}
          {Month[whichDate.getMonth(date)]}
        </Fragment>
      );
    }
  };

  getDegree = (temp) => {
    const newTemp = Math.floor(temp);
    return (
      <>
        {newTemp}
        <span>&deg;</span>{" "}
      </>
    );
  };

  getWeatherBoard = (props) => {
    // get forecast data from  props
    const { weather } = this.props;
    if (weather.data !== undefined) {
      const percentage = weather.data[0].pop;
      return (
        <>
          <div className="description">
            <div className="description__title">
              <img
                src={`https://www.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`}
                alt=""
              />
              <h4>Today</h4>
            </div>
            <p>{this.getDate(weather.data[0].timestamp_local)}</p>
            <h3>{this.getDegree(weather.data[0].temp)}</h3>
            <p>{weather.city_name}</p>
            <p>{`Feels Like ${Math.floor(
              weather.data[0].vis
            )} - Sunset 20:15`}</p>
          </div>
          <div className="chart">
            <h4>Chance of Rain</h4>
            <CircularProgressbar
              className="chart__circle"
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: "turquoise",
                pathColor: "turquoise",
                trailColor: "white",
              })}
            />
          </div>
        </>
      );
    }
  };

  render() {
    return <Fragment>{this.getWeatherBoard()}</Fragment>;
  }
}

export default CurrentForecastBoard;
