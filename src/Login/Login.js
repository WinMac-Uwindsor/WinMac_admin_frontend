import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { indigo } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

import { useState } from "react";

export default function Login() {
  const [currentForm, setCurrentForm] = useState("signup");

  

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({

  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  // const username = useContext(UserContext);
 

  const navigate = useNavigate();
  
  const handleUsernameChange = (event) => {
    //console.log(event);
    console.log(event.target.value);
    localStorage.setItem('username',event.target.value);

  };


  const handleLogin = () => {
 
      navigate('/DashBoard');
    } ;

  return (
    <Box
      sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ bgcolor: indigo[500] }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box>
        <TextField
          className="textfield"
          color="primary"
          onChange={handleUsernameChange}
          // value={username}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Uwin Email Address"
          name="email"
          autoFocus
        />
        {/* <TextField
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          name="password"
          label="Password"
          type="password"
          id="password"
        /> */}

        <FormControlLabel
          sx={{ alignItems: "left" }}
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          onClick={handleLogin}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
