import React, { useRef, useState } from "react";
import "./Login.scss";
import fire from "../../config/Fire";
import { useHistory } from "react-router-dom";
import OpenArrow from "../../assets/logos/openarrow.png";
import AboutModal from "../../components/AboutModal/AboutModal";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [validationError, setValidationError] = useState("");
  const [aboutState, setAboutState] = useState(false);

  // FUNCTION TO LOG IN
  async function login(event) {
    event.preventDefault();
    try {
      await fire.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setValidationError("Failed to log in");
    }
  }

  // FUNCTION TO SHOW CREATOR INFO
  const aboutHandler = () => {
    setAboutState(true);
  };

  // FUNCTION TO CLOSE CREATOR INFO
  const closeAboutHandler = () => {
    setAboutState(false);
  };

  return (
    <section className="login">
      {aboutState === true && <AboutModal closeAboutHandler={closeAboutHandler} />}
      <div className="login__about" onClick={aboutHandler}>
        <p className="login__about-text">ABOUT THE CREATOR</p>
        <img src={OpenArrow} className="login__about-open" alt="arrow pointing left to signify information about the creator can be shown if clicked" />
      </div>
      <div className="login__container">
        <form className="login__form">
          <h1 className="login__header">JTrack Log In</h1>
          <label className="login__form-title" htmlFor="email">
            Email
          </label>
          <input className="login__form-input" type="email" id="email" name="email" placeholder="Enter your email" ref={emailRef} />
          <label className="login__form-title" htmlFor="password">
            Password
          </label>
          <input className="login__form-input" type="password" id="password" name="password" placeholder="Enter your password" ref={passwordRef} />
          <div className="login__form-error-container">
            <p className="login__form-error">{validationError}</p>
          </div>
          <button className="login__form-submit" type="submit" onClick={login}>
            Log In
          </button>
          <div className="login__redirect">
            <p>
              Don't have an account?{" "}
              <a className="login__signup-link" href="/signup">
                Sign Up Here.
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
