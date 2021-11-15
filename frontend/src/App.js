import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./components/nav/Header";

// firebase
import { auth } from "./firebase";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

// redux

//This useDispatch hook returns a reference to the dispatch function from
// the Redux store. You may use it to dispatch actions as needed.
import { useDispatch, useSelector } from "react-redux";

import { currentUser } from "./connectBackend/auth";
import {App} from './components/routes/routes'

const AppWrapper = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({ ...state }));
 /*  console.log("this is user: ", user); */


  /*  const routing = useRoutes(App(isProtected)); */

  useEffect(() => {
    /*  console.log("useEffect is run") */
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        /*  console.log("user in App: ", user) */
        const idTokenResult = await getIdTokenResult(user);
        /* console.log("this is idtoken : ", idTokenResult); */

        currentUser(idTokenResult.token)
          .then((res) => {
            // this res is coming back from the backend
            /*  console.log("res coming back from the backend", res); */
            // send the data to redux state
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log("sending token to backend did not work", err);
          });
        
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Router>
      <Header /> 
      <ToastContainer />
        <App isProtected={user}/>
      </Router>
    </>
  );
};

export default AppWrapper;
