import React from "react";
import "./Header.scss";
import Gear from "../../assets/logos/gear.png";

function Header({ appList }) {
  return (
    <div className="header">
      <div className="header__title-container">
        <img src={Gear} className="header__logo" />
        <h3 className="header__title">JTrack</h3>
        {/* <p className="header__subtitle">- Job Tracker</p> */}
      </div>
      <div className="header__user-container">
        <p className="header__total">active applications: {appList.length}</p>
      </div>
    </div>
  );
}

export default Header;
