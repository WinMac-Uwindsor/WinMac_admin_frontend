import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
// import makeStyles from '@mui/styles/makeStyles';

const Attendance = () => {
    const username = localStorage.getItem('username');

  const [attendance, setAttendanceList] = useState([]);

  useEffect(() => {}, []);

  var intake = [];

  function getAttendance(intake) {
    console.log("intake: " + intake);
    return fetch("http://localhost:5000/winmac/studentData/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intake: intake }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Length send by server: " + data.length);
        console.log("Type of: " + typeof data.data);
        const dataArray = data.data; // get the array from the response object
        console.log(dataArray); // log the array to the console
        return dataArray;
      })
      .catch((error) => {
        console.error(`Error fetching data for event ${intake}:`, error);
        return null;
      });
  }

  function getCurrentDate() {
    var fall = "FALL-";
    var summer = "SUMMER-";
    var winter = "Winter-";
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    var yr = parseInt(currentYear);
    yr = yr - 1;
    const yrStr = yr.toString();
    const mo = parseInt(currentMonth);

    if (mo <= 4) {
      fall = fall + yrStr;
      summer = summer + yrStr;
      winter = winter + currentYear;
    } else if (mo > 4 && mo <= 8) {
      fall = fall + yrStr;
      summer = summer + currentYear;
      winter = winter + currentYear;
    } else {
      fall = fall + currentYear;
      summer = summer + currentYear;
      winter = winter + currentYear;
    }
    console.log("FALL: " + fall + " Summer: " + summer + " Winter: " + winter);
    console.log("fall: " + fall);
    var intake = [];
    intake[0] = fall;
    intake[1] = summer;
    intake[2] = winter;
    console.log(intake[2]);
    return intake;
  }

  var attendanceListSpring = [];
  var attendanceListFall = [];
  var attendanceListWinter = [];

  async function handleAttendanceSpring() {
    intake = getCurrentDate();
    try {
      const data = await getAttendance(intake[1]); // wait for the promise to resolve
      attendanceListSpring = data;
      console.log("inside button: " + data);
      setAttendanceList(attendanceListSpring);
    } catch (error) {
      console.error(`Error fetching data for intake ${intake[1]}:`, error);
    }
  }

  async function handleAttendanceFall() {
    intake = getCurrentDate();
    try {
      const data = await getAttendance(intake[0]); // wait for the promise to resolve
      attendanceListFall = data;
      console.log("inside button: " + data);
      setAttendanceList(attendanceListFall);
    } catch (error) {
      console.error(`Error fetching data for intake ${intake[0]}:`, error);
    }
  }

  async function handleAttendanceWinter() {
    intake = getCurrentDate();
    try {
      const data = await getAttendance(intake[2]); // wait for the promise to resolve
      attendanceListWinter = data;
      console.log("inside button: " + data);
      setAttendanceList(attendanceListWinter);
    } catch (error) {
      console.error(`Error fetching data for intake ${intake[2]}:`, error);
    }
  }

  return (
    <div>
      <div className="button-container">
        <Button variant="contained" onClick={handleAttendanceFall}>
          Fall
        </Button>
        <Button variant="contained" onClick={handleAttendanceSpring}>
          Spring
        </Button>
        <Button variant="contained" onClick={handleAttendanceWinter}>
          Winter
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="Attendance Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Event Booked</TableCell>
              <TableCell>Event Attended</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((row) => (
              <TableRow key={row.username}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.eventBooked.length}</TableCell>
                <TableCell>{row.eventAttended.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Attendance;
