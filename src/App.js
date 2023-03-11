import "./App.css";
import DashBoard from "./DashBoard/DashBoard";
import Events from "./Events/Events";
import Complaints from "./Complaints/Complaints";
import Navbar from "./Navbar";
import Attendance from "./Attendance/Attendance";
import { Route, Routes } from "react-router-dom";
import Records from "./Records/Records";
import Login from "./Login/Login";
import QRGenerator from "./QR/QRGenerator";
import UpdateEvent from "./Events/UpdateEvent";

function App() {
  return (
    <>
      {/* <SignUp /> */}
      {/* <Login /> */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Complaints" element={<Complaints />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Records" element={<Records />} />
        <Route path="/QRGenerator/:myString" element={<QRGenerator />} />
        <Route path="/UpdateEvent" element={<UpdateEvent />} />
      </Routes>
    </>
  );
}

export default App;
