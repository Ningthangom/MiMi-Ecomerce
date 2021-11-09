import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// redux component
import { useDispatch } from "react-redux";

// firebase
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, getIdTokenResult,signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// toast
import { toast } from "react-toastify";
import { Button } from "antd/lib/radio";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("ningthangom@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  let navigate = useNavigate();
  const dispatch = useDispatch();

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

    console.log("email and password", email, password);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);

      const { user } = result;
      console.log("this is user detail: ", user)
      const idTokenResult = await getIdTokenResult(user);
      toast.success("login successful");

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      // production
      /*  setEmail('');
        setPassword(''); */
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong. Please try again");
      setLoading(false);
    }
  };

  const googleLogin = async () => {
      console.log("google login")
    await signInWithPopup(auth,provider )
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      /* const credential = GoogleAuthProvider.credentialFromResult(result); */
     /*  const idTokenResult = credential.accessToken; */
      // The signed-in user info.
      const user = result.user;
      console.log("this is user detail: ", user)
      const idTokenResult =user.accessToken;
      console.log(idTokenResult);
      
      // ...
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult,
        },
      });

      navigate("/");
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };


  return (
    <div>
      <div className="container p-5 ">
        {/* 12 rows max */}
        <div className="row">
          <div className="col-md-6 offset-md-3 " style={{backgroundColor: "transparent"}}>
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
                  textAlign: 'center',
                   marginTop:10,
                    borderRadius: 20,
                    backgroundColor: "#3987c9",
                    marginBottom:0,
                    outline: 'none',
                    borderColor: 'orange',
                    padding: 0
                }}
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
    
            >
              Login
            </Button> 
            
            <Button 
            type="danger"
            className="mb-3 form-control"
             style={{
                 textAlign: 'center',
                 borderRadius: 20,
                 backgroundColor: "#db220a",
                  marginTop:0
                }}
                icon={<GoogleOutlined />}
             onClick={googleLogin}>
              Login with google
            </Button>
            <Link to ="/forgot/password" className="mt-10 float-right text-danger">Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
