import React from "react";
import "./BanList.css";
const BanList = (props) => {
  return (
    <div className="ban-list-container">
      <p className="ban-quote">Excluded Attributes:</p>
      <div className="ban-list">
        {props.banList.map((item, index) => {
          return (
            <p className="ban-item" key={index}>
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default BanList;
