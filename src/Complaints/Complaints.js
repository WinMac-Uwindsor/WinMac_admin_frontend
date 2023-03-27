import Button from "@mui/material/Button";
import "./Complaints.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import "./Complaints.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Complaints() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);

  useEffect(() => {
    // if(username === null){
    //   navigate('/login')
    // }
    getComplaints();
  }, []);

  function getComplaints() {
    axios.get("https://acservices-winmac-admin.onrender.com/winmac/support/").then((response) => {
      setDetails(response.data);
      console.log("response: " + response.data);
    });
  }

  function deleteComplaint(id) {
    console.log("id: " + id);
    axios
      .post("https://acservices-winmac-admin.onrender.com/winmac/support/deleteTicket", {
        event_id: id,
      })
      .then((response) => {
        console.log("cancel success", response.data);
        getComplaints();
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
      });
  }

  console.log("length: " + details.length);
  console.log("Details: " + JSON.stringify(details));

  return (
 
    <div className="body">
      <br />
         {details.length > 0 &&
          details.data.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: "50%",
                my: 2,
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid #000000",
                minHeight: "30vh",

              }}
            >
              <CardContent
                sx={{
                  padding: "1.5rem",
                  backgroundImage: "white",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "1rem",
                    
                  }}
                >
                  {item._id}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Student Username</span>{" "}
                  {item.username}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>message:</span>{" "}
                  {item.message}
                </Typography>
               
               
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "black",
                  height: "60px",
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  px: "1.5rem",
                }}
              >
             
                <Button
                  onClick={() => deleteComplaint(item._id)}
                  type="submit"
                  variant="contained"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "&:hover" ? "black" : "inherit",
                    backgroundColor: "&:hover" ? "white" : "transparent",
                    borderRadius: "10px",
                  }}
                >
                  Cancel
                </Button>
               
              </Box>
            </Card>
          ))}

    </div>
  );
}
