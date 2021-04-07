import React, { useState } from "react";
import "./ApplicationList.scss";
import fire from "../../config/Fire";
import Edit from "../../assets/logos/edit.png";
import Delete from "../../assets/logos/delete.png";
import StatusModal from "../StatusModal/StatusModal";
import DeleteModal from "../DeleteModal/DeleteModal";

function ApplicationList({ appList }) {
  const { id, company, title, description, timeStamp, link, status, location } = appList;
  const db = fire.firestore();
  const [updateThis, setUpdateThis] = useState(false);
  const [deleteThis, setDeleteThis] = useState(false);

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
      {deleteThis === true && <DeleteModal closeDeleteHandler={closeDeleteHandler} deleteApplication={deleteApplication} appList={appList} />}
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
          <p className="applist__status">
            {status === "Not Selected"
              ? `❌${status}`
              : status === "Hired"
              ? `🥳${status}`
              : status === "Interviewing"
              ? `💬${status}`
              : status === "Received an offer"
              ? `🤔${status}`
              : `✔️${status}`}
          </p>
          <p className="applist__description">{timeStamp ? new Date(timeStamp.seconds * 1000).toDateString() : ""}</p>
        </div>
        <div className="applist__buttons">
          <img src={Edit} className="applist__button" onClick={() => statusHandler(id)} alt="pencil logo" />
          <img src={Delete} className="applist__button" onClick={() => deleteHandler(id)} alt="trash can logo" />
        </div>
      </div>
    </div>
  );
}

export default ApplicationList;
