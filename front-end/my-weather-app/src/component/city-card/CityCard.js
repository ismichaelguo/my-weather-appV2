import React from "react";
import "./city-card.scss";
import { TiDeleteOutline } from "react-icons/ti";

class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
    };
  }

  deleteCard = (e) => {
    let cardIndex = e.target.id;
    this.props.onDeleteCard(cardIndex);
  };

  render() {
    return (
      <div className={"card"}>
        <div
          className="card__deleteBtn"
          onClick={this.deleteCard}
          id={this.props.index}
        >
          <TiDeleteOutline />
        </div>
        <img
          className="card__image"
          onClick={this.props.getWeatherData}
          id={this.props.city}
          src={this.props.photo}
          alt={this.props.city}
        />
        <p className="card__title">{this.props.city}</p>
      </div>
    );
  }
}

export default CityCard;
