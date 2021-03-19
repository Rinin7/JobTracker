import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import fire from "./config/Fire";

class App extends Component {
  state = {
    applications: [],
  };

  const db = fire.firestore();

  componentDidMount() {
    axios
      .get("http://localhost:8080/applications")
      .then((res) => {
        this.setState({
          applications: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  addApplication = (e) => {
    e.preventDefault();
    const newApplication = {
      company: e.target.company.value,
      title: e.target.title.value,
      description: e.target.description.value,
      applied: e.target.applied.value,
    };
    axios.post("http://localhost:8080/applications", newApplication).then((res) => {
      this.setState({
        applications: res.data,
      });
    });
  };

  deleteApplication = (applicationId) => {
    axios.delete(`http://localhost:8080/applications/${applicationId}`).then((res) => {
      this.setState({
        applications: res.data,
      });
    });
  };

  render() {
    const applications = this.state.applications.map((application) => {
      return (
        <li key={application.id} className="list-group-item">
          {`${application.company}, ${application.title}, ${application.description}, ${application.applied}`}
          <button className="remove" onClick={() => this.deleteApplication(application.id)}>
            REMOVE
          </button>
        </li>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2>Add Application🚀</h2>
            <form onSubmit={this.addApplication} ref={(form) => (this.form = form)}>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" placeholder="Enter Company Name" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Enter Title" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" placeholder="Enter Description" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="applied">Date Applied</label>
                <input type="text" id="applied" placeholder="Enter Date" className="form-control" />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-8">
            <h2>Applications😄</h2>
            <ul className="list-group">{applications}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
