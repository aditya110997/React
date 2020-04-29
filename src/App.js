import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {UserContext} from "./context/UserContext";

// react-router
import {Link, Route, BrowserRouter as Router, Switch} from "react-router-dom";

// Toast
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"

// Firebase and Firebaseui(if needed)
import firebase from "firebase/app"
import "firebase/auth" 

// Components
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';

import firebaseConfig from "./config/firebaseConfig";

// init firebase
firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState(null);
  const [didScroll, setDidScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const menu = document.getElementById("menubar");
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        console.log(didScroll);
        setDidScroll(true);
        menu.style.paddingTop = "10px";
        menu.style.paddingBottom = "10px";
        menu.style.backgroundColor = "#000";
        
      }
      else {
        setDidScroll(false);
        menu.style.paddingTop = "30px";
        menu.style.paddingBottom = "30px";
        menu.style.backgroundColor = "#192A56";
      } 
    });
  })

  return (
    <Router>
      <ToastContainer/>
      <UserContext.Provider value={{user, setUser}}>
        <NavBar id = "menubar" scroll = {didScroll}/>
        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/signin" component = {SignIn}/>
          <Route exact path = "/signup" component = {SignUp}/>
          <Route exact path = "*" component = {PageNotFound}/>
        </Switch>
        <Footer/>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
