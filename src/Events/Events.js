import Button from "@mui/material/Button";
import "./Events.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";


const Events = (props) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation]= useState(''); 

  useEffect(() => {
    getEvents();
  }, []);

  function getEvents() {
    axios.get("http://localhost:5000/winmac/eventList").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  
  function deleteEvent(event) {
    console.log("eventid: "+event);
    const url = 'http://localhost:5000/winmac/eventList/deleteEvent';
    const data = { event_id: event};
    
    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        getEvents();
      })
      .catch(error => {
        console.error("This is error: ",error);
      });
  }

  console.log("data: ", data.data);
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(event.target)
    setTitle('');
    setDescription('');
    setAuthor('');
  
  }
  
  return (
    <div className="event">
   
      <form className="form" onSubmit={handleFormSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            
            required
          />
          <TextField
            label="Author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            multiline
            required
          />
          <TextField
            label="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            multiline
            required
          />
          
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        
      <div>
      <br/>
      {data.length > 0 &&
        data.data.map((item, index) => (
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
              <div className="eventBtn" >
              <Button
                onClick={() => deleteEvent(item.event_id)}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Delete
              </Button>{" "}
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>{" "}
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                QR
              </Button>{" "}
            </div>
            }
          </Card>
        ))}
      </div>
        
    </div>
  );
};

export default Events;
