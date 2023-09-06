import { useContext, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../common/Auth/AuthContext";
import NavigationBar from "../../common/NavBar/NavBar";
import React from "react";
import MuiButtonSignIn from "../../common/MuiComponents/Buttons/MuiButtonSignIn";
import MuiTextLogin from "../../common/MuiComponents/TextField/MuiTextLogin";
import { ErrorToast } from "../../common/Toasts/Toasts";
import "./UserLogin.css";

const UserLogin =()=> {
  const navigate = useNavigate();
  const { setToken, setUserId, setIsAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    const body = JSON.stringify({
      password: password,
      username: email,
    });
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (email && password) {
      await axios
        .post("http://localhost:8080/api/auth/signin", body, header)
        .then((response) => {
          const token = response.headers.get("x-auth-token");
          let user;
          if (token) {
            setToken(token);
          }
          user = response.data;
          if (user) {
            //update the authContext
            if (user.roles[0] === "ADMIN") {
              setIsAdmin(true);
            }
            setUserId(user.id);
            navigate("/products");
          }
        })
        .catch(() => {
          ErrorToast("Invalid Credentials");
        });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="loginContainer">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Avatar className="avatarStyle">
            <LockIcon />
          </Avatar>
          <Typography gutterBottom variant="h5" component="p">
            Sign in
          </Typography>

          <MuiTextLogin
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            error={emailError}
          />
          <MuiTextLogin
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            error={passwordError}
          />

          <MuiButtonSignIn value="Sign In" />
        </form>
        <div className="signuplink">
          <Link to="/signup">Don't have an account? SignUp</Link>
        </div>
      </div>
      <div className="loginFooter">
        Copyright &copy; <Link href="https://www.upgrad.com/">upGrad</Link> 2023
      </div>
    </>
  );
}

export default UserLogin;
