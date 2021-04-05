import React, { useState } from "react";
import "./ApplicationList.scss";
import fire from "../../config/Fire";
import Fulltime from "../../assets/logos/fulltime.png";
import Parttime from "../../assets/logos/parttime.png";
import Contractor from "../../assets/logos/contractor.png";
import Temp from "../../assets/logos/temp.png";
import Edit from "../../assets/logos/edit.png";
import Delete from "../../assets/logos/delete.png";
import StatusModal from "../StatusModal/StatusModal";
import DeleteModal from "../DeleteModal/DeleteModal";

function ApplicationList({ appList }) {
  const { id, company, title, description, timeStamp, link, status, location } = appList;
  const db = fire.firestore();
  const [updateThis, setUpdateThis] = useState(false);
  const [deleteThis, setDeleteThis] = useState(false);

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

  // FUNCTION TO UPDATE STATUS
  function updateStatus(value) {
    db.collection("applications")
      .doc(id)
      .update({ status: value })
      .catch((error) => {
        console.log(error);
      });

    setUpdateThis(false);
  }

  const statusHandler = () => {
    setUpdateThis(true);
  };

  const closeStatusHandler = () => {
    setUpdateThis(false);
  };

  const deleteHandler = () => {
    setDeleteThis(true);
  };

  const closeDeleteHandler = () => {
    setDeleteThis(false);
  };

  return (
    <div className="applist">
      {updateThis === true && <StatusModal closeStatusHandler={closeStatusHandler} updateStatus={updateStatus} />}
      {deleteThis === true && <DeleteModal closeDeleteHandler={closeDeleteHandler} deleteApplication={deleteApplication} title={title} company={company} appList={appList} />}
      <div className="applist__container">
        <div className="applist__job" key={id}>
          <a href={link} target="_blank" rel="noreferrer noopener">
            <p className="applist__header">{company}</p>{" "}
          </a>
          <p className="applist__subheader">
            {title} | {location}
          </p>
          <p className="applist__description">{description}</p>
        </div>
        <div className="applist__applied">
          <p className="applist__status">{status}</p>
          <p className="applist__description">{timeStamp ? timeSince(timeStamp.seconds * 1000) : ""}</p>
        </div>
        <div className="applist__buttons">
          <img src={Edit} className="applist__button" onClick={() => statusHandler(id)} />
          <img src={Delete} className="applist__button" onClick={() => deleteHandler(id)} />
        </div>
      </div>
    </div>
  );
}

export default ApplicationList;
