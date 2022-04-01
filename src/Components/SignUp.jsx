import { Paper, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Firebase from "../firebaseConfig";


function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUserName] = useState('')

   const submitSignup = (e)=> {
       e.preventDefault()
    Firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        userCredential.user.updateProfile({displayName:username}).then(()=>{
        Firebase.firestore().collection('users').add({
            id:userCredential.user.uid,
            username:username,
            phoneNumber: phone, 
        }).then(()=>{ 
            alert("Your account is created successfully.")
            navigate('/')
        })
    })
    })
    .catch((error) => {
        alert(error.message)
    });
    }
  return (
    <div className="App-container">
      <Paper sx={{ height: "auto", width: 3/10 ,}} className="todo-container" elevation={15}>
        <Typography variant="h4" sx={{ my: 2, color: 'primary.main'}}>Sign Up</Typography>
        <form action="" className="login-form" onSubmit={submitSignup}>
        <TextField
            required fullWidth
            id="outlined-required"
            label="Username"
            sx={{mb: 2}}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            required fullWidth
            id="outlined-required"
            label="Email Address"
            type="email"
            sx={{mb: 2}}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required fullWidth
            id="outlined-number"
            label="Phone Number"
            type="number"
            
            sx={{mb: 2}}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            required fullWidth
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{mb: 2}}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={{width: 1/2}} >SIGN UP</Button>
          <Button variant="text" onClick={()=>navigate('/')}>Login</Button>
        </form>
      </Paper>
    </div>
  );
}

export default SignUp;
