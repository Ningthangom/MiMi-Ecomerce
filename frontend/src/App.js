

import React, {useEffect} from "react";
import { BrowserRouter as Router,  useRoutes} from "react-router-dom";



// toast
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


// components
import Header from './components/nav/Header'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import RegisterComplete from './pages/Auth/RegisterComplete'

// firebase 
import {auth} from './firebase';
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

// redux 

//This useDispatch hook returns a reference to the dispatch function from
// the Redux store. You may use it to dispatch actions as needed.
import {useDispatch} from 'react-redux';


 
const App = () => {

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/register/complete", element: <RegisterComplete /> },
    // ...
  ]);
  return routes;
};


const AppWrapper = () => {

  const dispatch = useDispatch();

  useEffect(() => {

     const unsubscribe = onAuthStateChanged(auth, async(user) => {
       if(user) {
        /*  console.log("user in App: ", user) */
         const idTokenResult = await getIdTokenResult(user)
        /*  console.log("this is idtoken : ", idTokenResult); */
         
         // dispatching token
         dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
         })
       }
     });

     return () => {
       unsubscribe()
     }

  },[dispatch])

  return (
    <>
    <Router>
    <Header/>
    <ToastContainer />
      <App />
    </Router>
    </>
  );
};

export default AppWrapper;
