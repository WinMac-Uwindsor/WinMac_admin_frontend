import Button from "@mui/material/Button";
import "./Complaints.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";

export default function Complaints() {
  const username = localStorage.getItem('username');

  const [details, setDetails] = useState([]);

  useEffect(() => {
    getComplsints();
  }, []);

  function getComplsints() {
    axios.get("http://localhost:5000/winmac/support/").then((response) => {
      setDetails(response.data);
      console.log("response: " + response.data);
    });
  }

  function deleteComplaint(id) {
    console.log("id: " + id);
    axios
      .post("http://localhost:5000/winmac/support/deleteTicket", {
        event_id: id,
      })
      .then((response) => {
        console.log("cancel success", response.data);
        getComplsints();
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
      });
  }

  console.log("length: " + details.length);
  console.log("Details: " + JSON.stringify(details));

  return (
    <div>
      <br />
      {details.length > 0 &&
        details.data.map((item, index) => (
          <Card sx={{ maxWidth: 700 }} className="event" key={index}>
            <CardHeader subheader={"Ticket No.: " + item._id} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {"Student username: " + item.username}
                <br />
                {"Complaint: " + item.message}
              </Typography>
            </CardContent>{" "}
            <div>
              <Button
                onClick={() => deleteComplaint(item._id)}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );
}
