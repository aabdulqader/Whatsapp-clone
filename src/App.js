import "./App.css";
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import { useStateValue } from "./StateProvider";
import { useContext, useState } from "react";
import { auth, provider } from "./firebase";
import { Button } from "@material-ui/core";
import { actionType } from "./Reducer";
import image from "./whatsapp.png";
import "./Login/Login.css";
function App() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <div className="login__container">
          <div className="login__container">
            <img src={image} />
            <div className="login__text">
              <h2>Sign in to Whatsapp</h2>
            </div>
            <Button type="submit" onClick={signIn} className="btn">
              SIGN IN WITH GOOGLE
            </Button>
          </div>
        </div>
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar user={user} />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
