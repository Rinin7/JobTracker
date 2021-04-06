import React, { useState, useEffect } from "react";
import "./Header.scss";
import Gear from "../../assets/logos/gear.png";
import { useHistory } from "react-router-dom";
import fire from "../../config/Fire";
import Logout from "../../assets/logos/logout.png";

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
    if (user) {
      getUsername();

      return () => {
        getUsername();
      };
    }
  }, []);

  return (
    <div className="header">
      <div className="header__title-container">
        <img src={Gear} className="header__logo" />
        <h3 className="header__title">JTrack</h3>
      </div>
      <div className="header__user-container">
        <p className="header__total">
          Welcome {username}! You have {appList.length} active applications.
        </p>
      </div>
      <div className="header__logout">
        <a className="header__logout-button" href="" onClick={logout}>
          <img className="header__logout-avatar" src={Logout} />

          <div class="header__logout-text">LOGOUT</div>
        </a>
      </div>
    </div>
  );
}

export default Header;
