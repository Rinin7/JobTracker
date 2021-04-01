import React, { useEffect, useState } from "react";
import "./ApplicationList.scss";
import fire from "../../config/Fire";
import Fulltime from "../../assets/logos/fulltime.png";
import Parttime from "../../assets/logos/parttime.png";
import Contractor from "../../assets/logos/contractor.png";
import Temp from "../../assets/logos/temp.png";
import Edit from "../../assets/logos/edit.png";
import Delete from "../../assets/logos/delete.png";
import Save from "../../assets/logos/save.png";

function ApplicationList({ appList }) {
  // const { id, company, title, description, timeStamp, link, status } = appList;
  const { id } = appList;

  const db = fire.firestore();
  const [editState, setEditState] = useState(false);
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [term, setTerm] = useState("");

  // FUNCTION TO MAKE TIMESTAMP MORE READABLE
  const timeSince = (date) => {
    let currentTime = Date.now();
    let difference = currentTime - date;
    let num = 0;

    const minute = 60000;
    const hour = 3600000;
    const day = 86400000;
    const week = 604800000;
    const month = 2592000000;
    const year = 31556952000;

    const timeBeforeNow = "moments ago";

    if (difference < minute) {
      return timeBeforeNow;
    } else if (difference < hour) {
      num = Math.floor(difference / minute);
      return num === 1 ? `${num} min ago` : `${num} mins ago`;
    } else if (difference < day) {
      num = Math.floor(difference / hour);
      return num === 1 ? `${num} hour ago` : `${num} hours ago`;
    } else if (difference < week) {
      num = Math.floor(difference / day);
      return num === 1 ? `${num} day ago` : `${num} days ago`;
    } else if (difference < month) {
      num = Math.floor(difference / week);
      return num === 1 ? `${num} week ago` : `${num} weeks ago`;
    } else if (difference < year) {
      num = Math.floor(difference / month);
      return num === 1 ? `${num} month ago` : `${num} months ago`;
    } else if (difference > year) {
      num = Math.floor(difference / year);
      return num === 1 ? `${num} year ago` : `${num} years ago`;
    }
  };

  // FUNCTION TO DELETE APPLICATION
  function deleteApplication() {
    db.collection("applications")
      .doc(id)
      .delete()
      .catch((error) => {
        console.log(error);
      });
  }

  // FUNCTION TO EDIT APPLICATION
  function editApplication() {
    setEditState(true);
    console.log(editState);
  }

  // FUNCTION TO UPDATE STATUS IN DB
  function saveApplication() {
    db.collection("applications")
      .doc(id)
      .update({ status, company, title, description, link })
      .catch((error) => {
        console.log(error);
      });

    setEditState(false);
  }

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

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="applist">
      {editState ? (
        <div className="applist__container" key={id}>
          <input type="text" id="company" className="applist__company" onChange={handleCompanyChange} placeholder={appList.company} value={company === "" ? appList.company : company} />
          <input type="text" id="title" onChange={handleTitleChange} placeholder={appList.title} value={title === "" ? appList.title : title} />
          <textarea type="text" id="description" onChange={handleDescriptionChange} placeholder={appList.description} value={description === "" ? appList.description : description} />
          <p>{appList.timeStamp ? timeSince(appList.timeStamp.seconds * 1000) : ""}</p>
          <select className="applist__status" id="status" onChange={handleStatusChange} placeholder={appList.status} value={status === "" ? appList.status : status}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input type="text" id="link" onChange={handleLinkChange} placeholder={appList.link} value={link === "" ? appList.link : link} />
        </div>
      ) : (
        <div className="applist__container" key={id}>
          {appList.term === "Full Time" ? <img src={Fulltime} className="applist__term" /> : ""}
          {appList.term === "Part Time" ? <img src={Parttime} className="applist__term" /> : ""}
          {appList.term === "Contract" ? <img src={Contractor} className="applist__term" /> : ""}
          {appList.term === "Temporary" ? <img src={Temp} className="applist__term" /> : ""}
          <h1 className="applist__title">{appList.company}</h1>
          <h2>{appList.title}</h2>
          <p>{appList.description}</p>
          <p>{appList.timeStamp ? timeSince(appList.timeStamp.seconds * 1000) : ""}</p>
          <p>{appList.status}</p>
          <a href={appList.link} target="_blank" rel="noreferrer noopener">
            View Job Posting
          </a>
        </div>
      )}

      <img src={Delete} className="applist__delete" onClick={() => deleteApplication(id)} />

      {editState === false ? <img src={Edit} className="applist__edit" onClick={() => editApplication(id)} /> : <img src={Save} className="applist__save" onClick={() => saveApplication(id)} />}
    </div>
  );
}

export default ApplicationList;
