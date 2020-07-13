import React from "react";
import "./city-card-container.scss";
import CityCard from "../city-card/CityCard";

class CityCardContainer extends React.Component {
  render() {
    //get input cities
    const { cities } = this.props;
    return (
      <div className="cityCards">
        {/* get elements list by using input city array */}
        {cities.map((city, index) => (
          <CityCard
            key={city.id}
            city={city.city}
            photo={city.cityImage}
            getWeatherData={this.props.getWeatherData}
            selectedCity={this.props.selectedCity}
            index={index}
            onDeleteCard={this.props.deleteCard}
          />
        ))}
      </div>
    );
  }
}

export default CityCardContainer;
