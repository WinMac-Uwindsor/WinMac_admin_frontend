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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const Layout = ({ children }) => {
    return (
      <>
        {isLoggedIn && <Navbar />}
        <Outlet />
      </>
    );
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<DashBoard />} />

          <Route path="/Events" element={<Events />} />
          <Route path="/Complaints" element={<Complaints />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Records" element={<Records />} />
          <Route path="/QRGenerator/:myString" element={<QRGenerator />} />
          <Route path="/UpdateEvent" element={<UpdateEvent />} />
        </Route>

        <Route path="/*" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
