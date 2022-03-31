import { Paper, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Firebase from "../firebaseConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitLogin = (e) => {
    e.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        navigate("home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="App-container">
      <Paper
        sx={{ height: "auto", width: 3 / 10 }}
        className="todo-container"
        elevation={15}
      >
        <Typography variant="h4" sx={{ my: 2, color: "primary.main" }}>
          Login
        </Typography>
        <form action="" className="login-form">
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Email Address"
            type="email"
            sx={{ mb: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            required
            fullWidth
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ mb: 2 }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: 1 / 2 }}
            onClick={submitLogin}
          >
            LOGIN
          </Button>
          <Button variant="text" onClick={() => navigate("signup")}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
