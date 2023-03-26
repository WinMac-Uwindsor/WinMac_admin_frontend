import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import  { useState } from "react";

const VALID_USERNAME = "abc";
const VALID_PASSWORD = "abc";

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

      navigate('/');
      localStorage.setItem('username',username);
      navigate('/', { state: { username } });

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
