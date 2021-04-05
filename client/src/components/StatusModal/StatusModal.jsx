import React from "react";
import "./StatusModal.scss";
import Rejected from "../../assets/logos/rejected.png";
import Offered from "../../assets/logos/offered.png";
import Hired from "../../assets/logos/hired.png";
import Interviewed from "../../assets/logos/interviewed.png";

function StatusModal({ closeStatusHandler, updateStatus }) {
  const notSelectedHandler = (value) => {
    updateStatus(value);
  };

  const interviewingHandler = (value) => {
    updateStatus(value);
  };

  const offerHandler = (value) => {
    updateStatus(value);
  };

  const hiredHandler = (value) => {
    updateStatus(value);
  };

  return (
    <section className="status" onClick={closeStatusHandler}>
      <div className="status-modal">
        <div className="status__header-container">
          <h3 className="status__header">Update application status to:</h3>
        </div>
        <button className="status__button" onClick={() => notSelectedHandler("Not Selected")}>
          <div className="status__selection">
            <div className="status__avatar-container">
              <img className="status__not-selected-avatar status__avatar" src={Rejected} />
            </div>
            <div className="status__content-container">
              <h2 className="status__title">I was not selected</h2>
              <p className="status__description">I was not selected for this role at this time.</p>
            </div>
          </div>
        </button>
        <button className="status__button" onClick={() => interviewingHandler("Interviewing")}>
          <div className="status__selection">
            <div className="status__avatar-container">
              <img className="status__interviewing-avatar status__avatar" src={Interviewed} />
            </div>
            <div className="status__content-container">
              <h2 className="status__title">I'm interviewing</h2>
              <p className="status__description">I am actively talking with the hiring manager.</p>
            </div>
          </div>
        </button>
        <button className="status__button" onClick={() => offerHandler("Received an offer")}>
          <div className="status__selection">
            <div className="status__avatar-container">
              <img className="status__offer-avatar status__avatar" src={Offered} />
            </div>
            <div className="status__content-container">
              <h2 className="status__title">I received an offer</h2>
              <p className="status__description">I'm reviewing the details before accepting the job.</p>
            </div>
          </div>
        </button>
        <button className="status__button" onClick={() => hiredHandler("Hired")}>
          <div className="status__selection">
            <div className="status__avatar-container">
              <img className="status__hired-avatar status__avatar" src={Hired} />
            </div>
            <div className="status__content-container">
              <h2 className="status__title">I was hired</h2>
              <p className="status__description">I've accepted an offer from the employer.</p>
            </div>
          </div>
        </button>
        <div className="status__cancel-container">
          <button className="status__cancel" onClick={closeStatusHandler}>
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default StatusModal;
