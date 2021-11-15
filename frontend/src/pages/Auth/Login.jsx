import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// redux component
import { useDispatch, useSelector } from "react-redux";

// firebase
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  getIdTokenResult,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// toast
import { toast } from "react-toastify";
import { Button } from "antd/lib/radio";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

import {createOrUpdateUser} from '../../connectBackend/auth';

// redirect users based on role
const roleBaseRedirect = (res, navigate) => {
      /* console.log("roleBaseRedirect is called") */
  if(res.data.role === 'admin'){
     navigate("/admin/dashboard");
  }else{
    navigate("/user/history");
  }
}


const Login = () => {
  const [email, setEmail] = useState("ningthangom@gmail.com");
  const [password, setPassword] = useState("987654321");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const provider = new GoogleAuthProvider();

  let navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {

    if (user && user.token) {
      navigate("/")
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    //
    /* console.log("handleSubmit is called") */
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

   /*  console.log("email and password", email, password); */

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
   /*    console.log(result); */

      const { user } = result;
     /*  console.log("this is user detail: ", user); */
      const idTokenResult = await getIdTokenResult(user);
      /* toast.success("login successful"); */
     /*  console.log(idTokenResult.token); */

      // calling function to send token to backend
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          // this res is coming back from the backend
          /* console.log("res coming back from the backend", res); */
          // send the data to redux state
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id
            },
          });
          roleBaseRedirect(res, navigate);
        })
        .catch((err) => {
          console.log("sending token to backend did not work", err);
        });

      // production
      /*  setEmail('');
        setPassword(''); */
    } catch (err) {
      console.log(err);
      toast.error("something went wrong. Please try again");
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    console.log("google login");
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        /* const credential = GoogleAuthProvider.credentialFromResult(result); */
        /*  const idTokenResult = credential.accessToken; */
        // The signed-in user info.
        const user = result.user;
        console.log("this is user detail: ", user);
        const idTokenResult = user.accessToken;
        /* console.log(idTokenResult); */

        // ...
        createOrUpdateUser(idTokenResult)
        .then((res) => {
          // this res is coming back from the backend
          console.log("res coming back from the backend", res);
          // send the data to redux state
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult,
              role: res.data.role,
              _id: res.data._id
            },
          });
        })
        .catch((err) => {
          console.log("sending token to backend did not work", err);
        });

        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        // The email of the user's account used.
        // The AuthCredential type that was used.
      console.log(error);
        // ...
      });
  };

  return (
    <div>
      <div className="container p-5 ">
        {/* 12 rows max */}
        <div className="row">
          <div
            className="col-md-6 offset-md-3 "
            style={{ backgroundColor: "transparent" }}
          >
            <h4> Welcome Back To MiMi-Ecomerce</h4>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder=" password"
                style={{ marginTop: 5 }}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </form>

            <Button
              onClick={handleSubmit}
              type="primary"
              className="mb-1 form-control"
              style={{
                textAlign: "center",
                marginTop: 10,
                borderRadius: 20,
                backgroundColor: "#3987c9",
                marginBottom: 0,
                outline: "none",
                borderColor: "orange",
                padding: 0,
              }}
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
              disabled={loading}
            >
              Login
            </Button>

            <Button
              type="danger"
              className="mb-3 form-control"
              style={{
                textAlign: "center",
                borderRadius: 20,
                backgroundColor: "#db220a",
                marginTop: 0,
              }}
              icon={<GoogleOutlined />}
              onClick={googleLogin}
            >
              Login with google
            </Button>
            <Link
              to="/forgot/password"
              className="mt-10 float-right text-danger"
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
