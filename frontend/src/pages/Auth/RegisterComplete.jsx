import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Button } from "antd";

// firebase
import {auth } from '../../firebase';
import { signInWithEmailLink, updatePassword, getIdTokenResult } from "firebase/auth";

// toast
import {toast} from 'react-toastify';


// use ({history}) => history.push
// use(props) => props.history.push

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  let navigate = useNavigate();



  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'));
    /* console.log(window.localStorage.getItem('emailForSignIn'));
    console.log(window.location.href) */
    /* console.log("this is history: ", history); */

  },[])

  const handleSubmit = async (e) => {
    //
    console.log("handleSubmit is called")
    e.preventDefault();

    if (!email || !password) {
        toast.error("Email and password is required");
        return;
      }
  
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }


    try{
        const result = await signInWithEmailLink(auth,email, window.location.href);

         console.log('log in successful: ', result);
         console.log(auth);

         // create password
         if(result.user.emailVerified){
            // remove user email from localStorage
            window.localStorage.removeItem('emailForSignIn')
            // get user id token
            let user = auth.currentUser;
            /* console.log('user: ', user); */
            await updatePassword(user, password);
            console.log("userpassword updated", password);
             const idTokenResult = await getIdTokenResult(user); 
             console.log("this is idTokenResult: ", idTokenResult) 
            // redirect
            navigate("/");


         }
         
    }catch(err) {
        console.log(err)
        toast.error(err);
    }

   
  };

  return (
    <div className="container p-5 ">
      {/* 12 rows max */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4> Welcome To MiMi-Ecomerce</h4>
         
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="email"
              autoFocus
            />
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder=" password"
              style={{marginTop: 5}}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
              <Button
                type="submit"
                color="success"
                variant="contained"
                className="btn "
                onClick={handleSubmit}
                style={{backgroundColor: '#0b2cbf', color: 'white', marginTop: 10}}
              >
               Register
              </Button>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
