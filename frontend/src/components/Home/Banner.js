import React, { useState } from "react";
import logo from "../../imgs/logo.png";

const Banner = (props) => {
  const [showInput, setShowInput] = useState();
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>A place to </span>
          <span id="get-part" onClick={() => setShowInput(true)}>
            get
          </span>
          {showInput && (
            <input
              type="search"
              id="search-box"
              className="search-box"
              placeholder="What is it that you truly desire?"
              onChange={props.onSearchChange}
            />
          )}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
