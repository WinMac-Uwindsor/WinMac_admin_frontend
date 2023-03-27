import Button from "@mui/material/Button";
import "./Events.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import UpdateEvent from "./UpdateEvent";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Events = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  function handleGenerateQR(eventId) {
    navigate(`/QRGenerator/${eventId}`);
  }

  function handleUpdate() {
    navigate(`/UpdateEvent`);
  }
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    // if(username === null){
    //   navigate('/login')
    // }
    getEvents();
  }, []);

  function getEvents() {
    axios.get("https://acservices-winmac-admin.onrender.com/winmac/eventList").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  function deleteEvent(event) {
    console.log("eventid: " + event);
    const url = "https://acservices-winmac-admin.onrender.com/winmac/eventList/deleteEvent";
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

  console.log("data: ", data.data);
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    console.log(
      title +
        "\n" +
        description +
        "\n" +
        author +
        "\n" +
        limit +
        "\n" +
        location +
        "\n" +
        date +
        "\n" +
        startTime +
        "\n" +
        endTime
    );
    setTitle("");
    setDescription("");
    setAuthor("");
    setLocation("");
    setStartTime("");
    setEndTime("");
    setDate("");
    setLimit("");
    addEventData(title, description, author, limit, location, date, startTime+"-"+endTime);
  }

  function addEventData(title, description, author, limit, location, date, etime){
    const url = 'https://acservices-winmac-admin.onrender.com/winmac/eventList/addEvent';
    const data = { 
      "title": title,  
      "limit": limit,
      "date": date, 
      "time": etime, 
      "location": location, 
      "Presenter": author, 
      "Desc": description
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
    <div>
      <form className="form" onSubmit={handleFormSubmit}>
        <TextField
        style={{paddingBottom:"20px"}}
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <TextField
         style={{paddingBottom:"20px"}}
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <TextField
         style={{paddingBottom:"20px"}}
          label="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          multiline
          required
        />
        <TextField
         style={{paddingBottom:"20px"}}
          label="Limit"
          type="number"
          pattern="[0-9]*"
          value={limit}
          onChange={(event) => setLimit(event.target.value)}
          required
        />
        <TextField
         style={{paddingBottom:"20px"}}
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
        

        <Button sx ={{margin: 2,  backgroundColor: "black"}} type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

        <br />
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <br />
        {data.length > 0 &&
          data.data.map((item, index) => (
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
                minHeight: "45vh",

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
                  {item.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Date of Event:</span>{" "}
                  {item.date}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Time of Event:</span>{" "}
                  {item.time}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Location of Event:</span>{" "}
                  {item.location}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Event Description:</span>{" "}
                  {item.Desc}
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
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>PRESENTER:</span>{" "}
                  {item.Presenter.toUpperCase()}
                </Typography>
                {/* <Button
                  onClick={handleOpen}
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
                </Button> */}
                <Button
                  onClick={() => deleteEvent(item.event_id)}
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
                  Delete
                </Button>
                <Button
                  onClick={() => handleGenerateQR(`${item.event_id}`)}
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
                  QRGenerator
                </Button>
              </Box>
            </Card>
          ))}
      </div>{" "}
    </div>
  );
};

export default Events;
