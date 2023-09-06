import { Avatar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import NavigationBar from "../../common/NavBar/NavBar";
import MuiButtonSubmitButton from "../../common/MuiComponents/Buttons/MuiButtonSubmitButton";
import MuiTextSignup from "../../common/MuiComponents/TextField/MuiTextSignup";

import { SuccessToast, ErrorToast } from "../../common/Toasts/Toasts";

import "./UserSignUp.css";

const  UserSignup = ()=> {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setContactNumberError(false);

    if (firstName === "") {
      setFirstName(true);
    }
    if (lastName === "") {
      setLastName(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (contactNumber === "") {
      setContactNumberError(true);
    }

    if (firstName && lastName && email && password && contactNumber) {
      axios
        .post("http://localhost:8080/api/auth/signup", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          contactNumber: contactNumber,
        })
        .then((response)=> {
          SuccessToast(response.data.message);
          navigate("/login");
        })
        .catch(()=> {
          ErrorToast(
            "Error: There was an issue in registering the user, please try again later."
          );
        });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="signupContainer">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Avatar className="avatarStyle">
            <LockIcon />
          </Avatar>
          <Typography gutterBottom variant="h5" component="p">
            Sign up
          </Typography>
          <MuiTextSignup
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            error={firstNameError}
            type="text"
          />
          <MuiTextSignup
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            error={lastNameError}
            type="text"
          />
          <MuiTextSignup
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={emailError}
            type="email"
          />
          <MuiTextSignup
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={passwordError}
            type="password"
          />
          <MuiTextSignup
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            error={password.length > 0 && confirmPassword !== password}
            type="password"
          />
          <MuiTextSignup
            label="Contact Number"
            onChange={(e) => setContactNumber(e.target.value)}
            value={contactNumber}
            error={contactNumberError}
            type="tel"
          />
          <MuiButtonSubmitButton
            disabled={password.length > 0 && confirmPassword !== password}
            value="Sign Up"
          />

          <div className="loginLink">
            <Link to="/login">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
      <div className="signupFooter">
        Copyright &copy; <Link href="https://www.upgrad.com/">upGrad</Link> 2023
      </div>
    </>
  );
}

export default UserSignup;
