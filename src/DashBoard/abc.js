import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";

const Dashboard = ({ history }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    setLoggedIn(false);
    history.push("/login");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {loggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              <ExitToAppIcon style={{ marginRight: "0.5rem" }} />
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h4" style={{ marginBottom: "2rem" }}>
          Welcome to the Dashboard!
        </Typography>
        <Typography variant="body1">
          This is where you can access all the different sections of the
          dashboard.
        </Typography>
        <nav style={{ marginTop: "2rem" }}>
          <ul>
            <li>
              <Link to="/dashboard/home">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
