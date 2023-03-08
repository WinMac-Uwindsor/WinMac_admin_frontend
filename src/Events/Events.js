import Button from "@mui/material/Button";
import "./Events.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import "./Events.css";


const Events = () => {

  const navigate = useNavigate();

  function handleGenerateQR(eventId) {
    navigate(`/QRGenerator/${eventId}`);
  }

  function handleUpdate() {
    navigate(`/UpdateEvent`);
  }
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation]= useState(''); 
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


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

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(event.target)
    console.log(title+"\n"+description+"\n"+author+"\n"+limit+"\n"+location+"\n"+date+"\n"+startTime+"\n"+endTime);
    setTitle('');
    setDescription('');
    setAuthor('');
    setLimit('');
    setDate('');
    setLocation('');
    setStartTime('');
    setEndTime('');
    addEvent(title,limit,description,author,location,date,startTime+"-"+endTime);
  }

  function addEvent(title,limit,description,author,location,date,time) {
    const url = 'http://localhost:5000/winmac/eventList/addEvent';
    const data = {
      title: title, 
      limit: limit,
      date: date, 
      time: time, 
      location: location, 
      Presenter: author, 
      Desc: description
    };
    
    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        getEvents();
      })
      .catch(error => {
        console.error("This is error: ",error);
      });
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
            label="Limit"
            type="number"
  pattern="[0-9]*"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
            
            required
          />
          <TextField
            label="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            multiline
            required
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
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
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
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
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
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

          
          <Button type="submit" variant="contained" color="primary" >
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
                Date of Event: {item.title}
                <br />
                Time of Event: {item.time}
                <br />
                Location of Event: {item.location}
                <br />
                Event Description: {item.Desc}
                <br />
                Event Date: {item.date}
                <br />
                Event end time: {item.time}


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
                  onClick={()=>handleUpdate()}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>{" "}
              <Button
                  onClick={()=>handleGenerateQR(`${item.event_id}`)}
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
  );
};

export default Events;