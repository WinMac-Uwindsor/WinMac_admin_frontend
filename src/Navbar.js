import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { AppBar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { ListItemText } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import BookIcon from "@mui/icons-material/Book";
import Hidden from "@mui/material/Hidden";
import EventIcon from "@mui/icons-material/Event";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import uwinLogo from "./uwindsor_logo.png";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("DashBoard");

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const linkStyleHeaderNav = {
    margin: "0 1rem",
    textDecoration: "none",
    color: "white",
  };

  const linkStyle = {
    margin: "0 1rem",
    textDecoration: "none",
    color: "black",
  };

  const img = {
    maxWidth: "100%",
    height: "auto",
    width: "auto",
  };
  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "ButtonText" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div style={img}>
            <img
              src={uwinLogo}
              alt="Logo"
              style={{ height: "40px", marginRight: "16px" }}
            />
          </div>
          <Hidden smDown>
            <Typography style={linkStyleHeaderNav} variant="h6">
              {name}
            </Typography>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <Link
              to="/DashBoard"
              style={linkStyle}
              onClick={() => setName("DashBoard")}
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="DashBoard" />
              </ListItem>
            </Link>
            
            <Link
              to="/Events"
              style={linkStyle}
              onClick={() => setName("Event")}
            >
              <ListItem button>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Event" />
              </ListItem>
            </Link>
            <Link
              to="/Complaints"
              style={linkStyle}
              onClick={() => setName("Support")}
            >
              <ListItem button>
                <ListItemIcon>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText primary="Support" />
              </ListItem>
            </Link>
            <Link
              to="/Attendance"
              style={linkStyle}
              onClick={() => setName("Attendance")}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Attendance" />
              </ListItem>
            </Link>
            <Link
              to="/Records"
              style={linkStyle}
              onClick={() => setName("Records")}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Records" />
              </ListItem>
            </Link>
            <Link
              to="/QRGenerator/:myString"
              style={linkStyle}
              onClick={() => setName("QRGenerator")}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="QRGenerator" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import "./Navbar.css";

// import { Link,  } from "react-router-dom";
// import "./App.css";
// import { color } from "@mui/system";


// function Navbar() {
 
  
//   const linkStyle = {
//     margin: "1rem",
    
//     color:"white",
//     textdecoration:"none"
//   };
//   return (
//     <AppBar className="appBar" position="relative">
//       <CssBaseline />
//       <Toolbar>
//         <Typography variant="h4" >
//           WIN MAC
//         </Typography>
//           <Link to="/DashBoard"  style={linkStyle}>
//             DashBoard
//           </Link>
          
//           <Link to="/Events"  style={linkStyle}>
//             Events
//           </Link>
//           <Link to="/Complaints"  style={linkStyle}>
//           Complaints
//           </Link>
//           <Link to="/Attendance"  style={linkStyle}>
//           Attendance
//           </Link>
//           <Link to="/Records"  style={linkStyle}>
//           Records
//           </Link>
//           <Link to="/QRGenerator"  style={linkStyle}>
//           QRGenerator
//           </Link>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;
