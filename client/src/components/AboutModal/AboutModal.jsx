import React from "react";
import "./AboutModal.scss";
import Headshot from "../../assets/images/ryan-headshot.jpg";
import LinkedIn from "../../assets/logos/linkedin.png";
import GitHub from "../../assets/logos/github.png";
import Email from "../../assets/logos/email.jpg";
import CloseArrow from "../../assets/logos/closearrow.png";

function AboutModal({ closeAboutHandler }) {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__close">
          <img className="about__close-arrow" src={CloseArrow} onClick={closeAboutHandler} />
        </div>
        <div className="about__images">
          <div className="about__headshot-container">
            <img className="about__headshot" src={Headshot} />
          </div>

          <div className="about__socials">
            <a href="https://www.linkedin.com/in/ryan-doubinin/" target="_blank">
              <img className="about__socials-logo" src={LinkedIn} />
            </a>
            <a href="https://github.com/rinin7" target="_blank">
              <img className="about__socials-logo" src={GitHub} />
            </a>
            <a href="mailto:ryan.doubinin@gmail.com" target="_blank">
              <img className="about__socials-logo" src={Email} />
            </a>
          </div>
        </div>
      </div>
      <div className="about__info">
        <h2 className="about__header">About the creator of JTrack</h2>
        <p className="about__body">
          <span className="about__important">Ryan Doubinin</span> is a Full Stack Web Developer based out of Calgary, Alberta. Currently looking for work and open to all opportunities!
        </p>
        <p className="about__body">
          JTrack is available on my GitHub as a public repository. If you like JTrack or are interested in building a project with me, please reach out with one of the available links!
        </p>
      </div>
    </div>
  );
}

export default AboutModal;
