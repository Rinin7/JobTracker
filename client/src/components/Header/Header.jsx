import React, { useState, useEffect } from "react";
import "./Header.scss";
import Gear from "../../assets/logos/gear.png";
import { Link, useHistory } from "react-router-dom";
import fire from "../../config/Fire";

function Header({ appList, user }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const db = fire.firestore();

  // LOGOUT FUNCTION
  function logout() {
    fire.auth().signOut();
    history.push("/login");
  }

  // FUNCTION TO GET USERNAME
  function getUsername() {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        const data = documentSnapshot.data();
        setUsername(data.username);
      });
  }

  useEffect(() => {
    getUsername();
  });

  return (
    <div className="header">
      <div className="header__title-container">
        <img src={Gear} className="header__logo" />
        <h3 className="header__title">JTrack</h3>
        {/* <p className="header__subtitle">- Job Tracker</p> */}
      </div>
      <div className="header__user-container">
        <p className="header__total">
          Welcome {username}! You have {appList.length} active applications.
        </p>
      </div>
      <p onClick={logout} className="navigation__list-item">
        Logout
      </p>
    </div>
  );
}

export default Header;
