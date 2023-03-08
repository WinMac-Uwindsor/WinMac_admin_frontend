import Button from "@mui/material/Button";
import "./Events.css";
import axios from "axios";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const Events = (props) => {
  const username = localStorage.getItem('username');

  const navigate = useNavigate();
  function handleClick(eventId) {
    navigate(`/QRGenerator/${eventId}`);
  }
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    author: "",
    location: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    getEvents();
  }, []);

  function getEvents() {
    axios.get("http://localhost:5000/winmac/eventList").then((response) => {
      setFormData(response.data);
      console.log(response.data);
    });
  }

  function deleteEvent(event) {
    console.log("eventid: " + event);
    const url = "http://localhost:5000/winmac/eventList/deleteEvent";
    const data = { event_id: event };

    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        getEvents();
      })
      .catch((error) => {
        console.error("This is error: ", error);
      });
  }

  console.log("data: ", formData.data);
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    setFormData([...formData]);
  }

  return (
    <div>
     <div className="event">
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="startTime"
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
          <TextField
            name="endTime"
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
          <TextField
            name="author"
            label="Author"
            value={formData.author}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" >
              Submit
            </Button>
          </Box>
        </form>

        <div>
          <br />
          {formData.length > 0 &&
            formData.formData.map((item, index) => (
              <Card sx={{ maxWidth: 700 }} className="event" key={index}>
                <CardHeader
                  title={item.title}
                  subheader={"By: " + item.Presenter}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Date of Event: {item.date}
                    <br />
                    Time of Event: {item.time}
                    <br />
                    Location of Event: {item.location}
                    <br />
                    Event Description: {item.Desc}
                  </Typography>
                </CardContent>{" "}
                {
                  <div className="eventBtn">
                    <Button
                      onClick={() => deleteEvent(item.event_id)}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Delete
                    </Button>{" "}
                    <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Update
                    </Button>{" "}
                    <Button
                      onClick={() => handleClick(`${item.event_id}`)}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Generate QR
                    </Button>
                  </div>
                }
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
