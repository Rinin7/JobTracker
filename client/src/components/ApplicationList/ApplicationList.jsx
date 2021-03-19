import React from "react";
import "./ApplicationList.scss";

function ApplicationList({ appList }) {
  const { id, company, title, description, timeStamp } = appList;

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

  return (
    <div className="applist" key={id}>
      <h1 className="applist__title">{company}</h1>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{timeStamp ? timeSince(timeStamp.seconds * 1000) : ""}</p>
    </div>
  );
}

export default ApplicationList;
