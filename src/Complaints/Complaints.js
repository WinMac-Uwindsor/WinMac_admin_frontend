import Button from "@mui/material/Button";
<<<<<<< HEAD
import './Complaints.css';
=======
import "./Complaints.css";
>>>>>>> dc66b840d6e9f1fd65b1eacfa93bc824d1bc13ce
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";

<<<<<<< HEAD

export default function Complaints() {
=======
export default function Complaints() {
  const username = localStorage.getItem('username');

>>>>>>> dc66b840d6e9f1fd65b1eacfa93bc824d1bc13ce
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getComplsints();
  }, []);

  function getComplsints() {
<<<<<<< HEAD
      axios.get("http://localhost:5000/winmac/support/").then((response) => {
      setDetails(response.data);
      console.log("response: "+response.data);
    });
  }


  function deleteComplaint(id) {
    console.log("id: "+id);
    axios
      .post("http://localhost:5000/winmac/support/deleteTicket", {'event_id': id})
      .then((response) => {
        console.log("cancel success",response.data);
=======
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
>>>>>>> dc66b840d6e9f1fd65b1eacfa93bc824d1bc13ce
        getComplsints();
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
      });
  }

<<<<<<< HEAD
  
  console.log("length: "+details.length);
=======
  console.log("length: " + details.length);
>>>>>>> dc66b840d6e9f1fd65b1eacfa93bc824d1bc13ce
  console.log("Details: " + JSON.stringify(details));

  return (
    <div>
<<<<<<< HEAD
      <br/>
    {details.length > 0 &&
      details.data.map((item, index) => (
        <Card sx={{ maxWidth: 700 }} className="event" key={index}>
          <CardHeader 
            subheader={"Ticket No.: "+item._id}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {"Student username: "+item.username}<br/>
              {"Complaint: "+item.message}
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
             
=======
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
>>>>>>> dc66b840d6e9f1fd65b1eacfa93bc824d1bc13ce
