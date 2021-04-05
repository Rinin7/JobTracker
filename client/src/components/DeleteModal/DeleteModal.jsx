import React from "react";
import "./DeleteModal.scss";

function DeleteModal({ closeDeleteHandler, deleteApplication, appList }) {
  return (
    <section className="delete" onClick={closeDeleteHandler}>
      <div className="delete-modal">
        <div className="delete__content-container">
          <h1 className="delete__header">
            Delete application for {appList.title} at {appList.company}?
          </h1>
          <p className="delete__body">Please confirm that you'd like to delete {appList.title} from the list of applications. You won't be able to undo this action.</p>
        </div>
        <div className="delete__button-container">
          <button className="delete__button-cancel" onClick={closeDeleteHandler}>
            Cancel
          </button>
          <button className="delete__button-delete" onClick={() => deleteApplication}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteModal;
