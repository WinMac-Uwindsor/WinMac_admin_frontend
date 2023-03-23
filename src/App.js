import React, { useState } from "react";
import "./App.css";
import DashBoard from "./DashBoard/DashBoard";
import Events from "./Events/Events";
import Complaints from "./Complaints/Complaints";
import Navbar from "./Navbar";

import Attendance from "./Attendance/Attendance";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Records from "./Records/Records";
import Login from "./Login/Login";
import QRGenerator from "./QR/QRGenerator";
import UpdateEvent from "./Events/UpdateEvent";
import Header from "./Navbar";
import MayBeShowNavbar from "./Login/MayBeShowNavbar";

function App() {

  return (
    <BrowserRouter>
      <MayBeShowNavbar>
        <Navbar />
      </MayBeShowNavbar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<DashBoard />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Complaints" element={<Complaints />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Records" element={<Records />} />
        <Route path="/QRGenerator/:myString" element={<QRGenerator />} />
        <Route path="/UpdateEvent" element={<UpdateEvent />} />

        <Route path="/*" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
