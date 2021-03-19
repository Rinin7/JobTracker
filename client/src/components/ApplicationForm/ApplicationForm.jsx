import React, { useState } from "react";
import "./ApplicationForm.scss";
import fire from "../../config/Fire";
import firebase from "firebase";

function ApplicationForm() {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  const db = fire.firestore();

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection("applications").add({ company, title, description, timeStamp });
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
        <label className="appform__label" htmlFor="description">
          Description
        </label>
        <textarea className="appform__input" type="text" id="description" onChange={handleDescriptionChange} placeholder="Enter the description here" />
        <button className="appform__submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default ApplicationForm;
