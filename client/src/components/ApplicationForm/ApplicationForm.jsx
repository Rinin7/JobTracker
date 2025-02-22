import React, { useState } from "react";
import "./ApplicationForm.scss";
import fire from "../../config/Fire";
import firebase from "firebase";

function ApplicationForm({ user }) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  const db = fire.firestore();
  const [formError, setFormError] = useState("");
  const [location, setLocation] = useState("");
  const [term, setTerm] = useState("");

  // FORM INPUT STATE CHANGE HANDLERS
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  // FUNCTION TO SUBMIT FORM DATA TO DB
  const handleSubmit = (event) => {
    event.preventDefault();

    // FORM VALIDATION
    if (company === "") {
      return setFormError("Please enter a company name");
    }

    if (title === "") {
      return setFormError("Please enter a job title");
    }

    if (location === "") {
      return setFormError("Please enter a location");
    }

    if (term === "") {
      return setFormError("Please enter a term");
    }

    if (link === "") {
      return setFormError("Please include a link for the job posting");
    }

    if (description === "") {
      return setFormError("Please enter a brief description");
    }

    db.collection("applications").add({ company, title, description, timeStamp, link, status: "Applied", term, location, hostId: user.uid });

    event.target.reset();
    setFormError("");
  };

  return (
    <div className="appform">
      <form className="appform__form" onSubmit={handleSubmit}>
        <h1 className="appform__title">New Application🚀</h1>
        <label className="appform__label" htmlFor="company">
          Company
        </label>
        <input className="appform__input" type="text" id="company" onChange={handleCompanyChange} placeholder="Enter the company name here" />
        <label className="appform__label" htmlFor="title">
          Title
        </label>
        <input className="appform__input" type="text" id="title" onChange={handleTitleChange} placeholder="Enter the title here" />
        <label className="appform__label" htmlFor="location">
          Location
        </label>
        <input className="appform__input" type="text" id="location" onChange={handleLocationChange} placeholder="Enter the location here" />
        <label className="appform__label" htmlFor="term">
          Term
        </label>
        <select className="appform__select" id="term" onChange={handleTermChange}>
          <option value="">Please choose...</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Temporary">Temporary</option>
          <option value="Contract">Contract</option>
        </select>
        <label className="appform__label" htmlFor="link">
          Link
        </label>
        <input className="appform__input" type="text" id="link" onChange={handleLinkChange} placeholder="Enter the application link here" />
        <label className="appform__label" htmlFor="description">
          Description
        </label>
        <textarea className="appform__textbox" type="text" id="description" onChange={handleDescriptionChange} placeholder="Enter the description here" />
        {formError ? <p className="appform__error">{formError}</p> : <div></div>}
        <div className="appform__submit-container">
          <button aria-label="submit" className="appform__submit" data-text="Submit">
            <span className="appform__submit-span">g</span>
            <span className="appform__submit-span">o</span>
            <span className="appform__submit-span">o</span>
            <span className="appform__submit-span">d</span>
            <span className="appform__submit-span"> </span>
            <span className="appform__submit-span">l</span>
            <span className="appform__submit-span">u</span>
            <span className="appform__submit-span">c</span>
            <span className="appform__submit-span">k</span>
            <span className="appform__submit-span">!</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
