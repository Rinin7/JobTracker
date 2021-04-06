import React, { useEffect, useState } from "react";
import "./Home.scss";
import fire from "../../config/Fire";
import ApplicationList from "../../components/ApplicationList/ApplicationList";
import ApplicationForm from "../../components/ApplicationForm/ApplicationForm";
import Header from "../../components/Header/Header";

function Home({ user }) {
  const [activeApplications, setActiveApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const db = fire.firestore();

  function getActiveApplications() {
    db.collection("applications")
      .where("status", "!=", "Not Selected")
      .orderBy("status")
      .orderBy("timeStamp", "desc")
      .onSnapshot((querySnapshot) => {
        const application = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setActiveApplications(application);
      });
  }

  function getRejectedApplications() {
    db.collection("applications")
      .where("status", "==", "Not Selected")
      .orderBy("timeStamp", "desc")
      .onSnapshot((querySnapshot) => {
        const application = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRejectedApplications(application);
      });
  }

  useEffect(() => {
    getActiveApplications();
    getRejectedApplications();
  }, []);

  return (
    <section className="home">
      <Header key={activeApplications.id} appList={activeApplications} user={user} />
      <div className="home__main">
        <div className="home__form">
          <ApplicationForm />
        </div>
        <div className="home__list">
          <div className="home__accepted">
            <details>
              <summary className="home__title">Active Applications😄</summary>
              {activeApplications.map((activeApplication) => (
                <ApplicationList key={activeApplication.id} appList={activeApplication} />
              ))}
            </details>
          </div>
          <div className="home__rejected">
            <details>
              <summary className="home__title">Not Accepted🙃 ({rejectedApplications.length})</summary>
              {rejectedApplications.map((rejectedApplication) => (
                <ApplicationList key={rejectedApplication.id} appList={rejectedApplication} />
              ))}
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
