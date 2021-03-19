import React, { useEffect, useState } from "react";
import "./App.scss";
import fire from "./config/Fire";
import ApplicationList from "./components/ApplicationList/ApplicationList";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";

function App() {
  const [applications, setApplications] = useState([]);
  const db = fire.firestore();

  function getApplications() {
    db.collection("applications").onSnapshot((querySnapshot) => {
      const application = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setApplications(application);
    });
  }

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <section className="app">
      <div className="app__form">
        <ApplicationForm />
      </div>
      <div className="app__list">
        <h1 className="app__title">Applications😄</h1>
        {applications.map((application) => (
          <ApplicationList key={application.id} appList={application} />
        ))}
      </div>
    </section>
  );
}

export default App;
