import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./Navbar.css";

import { Link,  } from "react-router-dom";
import "./App.css";


function Navbar() {
 
  
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
  };
  return (
    <AppBar position="relative">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" >
          WIN MAC
        </Typography>
          <Link to="/DashBoard"  style={linkStyle}>
            DashBoard
          </Link>
          
          <Link to="/Events"  style={linkStyle}>
            Events
          </Link>
          <Link to="/Complaints"  style={linkStyle}>
          Complaints
          </Link>
          <Link to="/Attendance"  style={linkStyle}>
          Attendance
          </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
