import React from "react";
import "./Country.css";
import japan from "../assets/japan.jpeg";

const Country = ({ inputs, addBanList }) => {
  return (
    <div className="destination-container">
      <div className="attribute-list">
        <p className="attribute-item" onClick={() => addBanList(inputs.name)}>
          {inputs.name}
        </p>
        <p className="attribute-item" onClick={() => addBanList(inputs.city)}>
          {inputs.city}
        </p>
        <p
          className="attribute-item"
          onClick={() => addBanList(inputs.country)}
        >
          {inputs.country}
        </p>
      </div>
      <p className="alt-description">{inputs.description}</p>
      <img className="country-img" src={inputs.img} />
    </div>
  );
};
export default Country;
