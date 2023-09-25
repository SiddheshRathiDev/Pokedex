import React from "react";
import "./header.style.css";

const Header = ({ windowSize }) => {
  return (
    <div>
      <div
        className="header"
        style={
          windowSize < 600
            ? {
                display: "flex",
                flexDirection: "column",
                marginInlineStart: "auto",
              }
            : { display: "flex", flexDirection: "row" }
        }
      >
        <h1 className="logo">Pokédex</h1>
        {windowSize < 600 ? (
          <hr
            style={{
              border: "2px solid #70728d",
              width: `${windowSize - 80}px`,
            }}
          ></hr>
        ) : (
          <div className="vertical"></div>
        )}
        <h3 className="tagline">
          Search for any Pokémon that exists on the planet
        </h3>
      </div>
    </div>
  );
};

export default Header;
