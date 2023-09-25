import React from "react";

import "./card.style.css";

const Card = ({ img, pokemon, index, color, openModal, windowSize }) => {
  return (
    <div
      onClick={(e) => openModal(e, index)}
      className={windowSize > 600 ? "card" : "card-mobile"}
      style={{
        backgroundImage: `${color}`,
      }}
    >
      <div
        className={windowSize > 600 ? "cardImage" : "cardImage-mobile"}
        style={{}}
      >
        <img
          src={`${img}`}
          alt={"pokemon"}
          className={windowSize > 600 ? "image" : "image-mobile"}
        />
      </div>
      <div className={windowSize > 600 ? "cardItems" : "cardItems-mobile"}>
        <h3
          style={{
            fontWeight: "bold",
            fontSize: windowSize > 600 ? "18px" : "15px",
            // display: windowSize > 600 ? "block" : "none",
          }}
        >
          {pokemon?.toUpperCase()}
        </h3>
        <p
          style={{
            fontWeight: "500",
            fontSize: windowSize > 600 ? "18px" : "12px",
            //   display: windowSize > 600 ? "block" : "none",
          }}
        >
          {("00" + index).slice(-3)}
        </p>
      </div>
    </div>
  );
};

export default Card;
