import { Paper, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SignUp() {
    const navigate = useNavigate()
  return (
    <div className="App-container">
      <Paper sx={{ height: "auto", width: 3/10 ,}} className="todo-container" elevation={15}>
        <Typography variant="h4" sx={{ my: 2, color: 'primary.main'}}>Sign Up</Typography>
        <form action="" className="login-form">
        <TextField
            required fullWidth
            id="outlined-required"
            label="Username"
            sx={{mb: 2}}
          />
          <TextField
            required fullWidth
            id="outlined-required"
            label="Email Address"
            type="email"
            sx={{mb: 2}}
          />
          <TextField
            required fullWidth
            id="outlined-number"
            label="Phone Number"
            type="number"
            
            sx={{mb: 2}}
          />
          <TextField
            required fullWidth
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{mb: 2}}
          />
          <Button variant="contained" type="submit" sx={{width: 1/2}}>SIGN UP</Button>
          <Button variant="text" onClick={()=>navigate('/')}>Login</Button>
        </form>
      </Paper>
    </div>
  );
}

export default SignUp;
