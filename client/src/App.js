import React, { useEffect, useState } from "react";
import "./App.scss";
import fire from "../src/config/Fire";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Signup from "../src/pages/Signup/Signup";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [user, setUser] = useState(undefined);
  const [authListenerAdded, setAuthListenerAdded] = useState(false);
  const [username, setUsername] = useState("");
  const db = fire.firestore();

  // FUNCTION FOR AUTHENTICATION
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setUser(null);
        localStorage.removeItem("isAuthenticated");
        setUsername("");
      }
    });

    setAuthListenerAdded(true);
  };

  useEffect(() => {
    if (!authListenerAdded) {
      authListener();
    }

    if (user && username === "") {
      db.doc(`users/${user.uid}`)
        .get()
        .then((documentSnapshot) => {
          const data = documentSnapshot.data();

          if (data && data.username) {
            setUsername(documentSnapshot.data().username);
          }
        });
    }
  }, [user]);

  // FUNCTION TO CHANGE ROUTES TO PROTECTED ROUTES
  function PrivateRoute({ component: Component, ...rest }) {
    return <Route {...rest} render={(props) => (localStorage.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
  }

  return (
    <BrowserRouter>
      <section className="app">
        <Switch>
          <Route path="/login" exact component={(routerProps) => <Login {...routerProps} user={user} />} />
          <Route path="/signup" exact component={(routerProps) => <Signup {...routerProps} user={user} />} />
          <PrivateRoute path="/" exact component={(routerProps) => <Home {...routerProps} user={user} />} />
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
