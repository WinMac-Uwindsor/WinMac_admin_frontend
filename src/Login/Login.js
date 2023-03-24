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


import  { useState } from "react";

const VALID_USERNAME = "myusername";
const VALID_PASSWORD = "mypassword";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("user",event.target.value)

    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
      setError("Invalid username or password");
    } else {
      // Login successful

      navigate('/DashBoard');
      localStorage.setItem('username',username);

      console.log("Login successful");
    }
  };

  return (
    <form onSubmit={handleSubmit}  value={username}>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
