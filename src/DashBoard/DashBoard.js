import { useState } from "react";
import { Data } from "../Components/DashboardData";
import * as XLSX from "xlsx";
import { UserContext } from "../App";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import "../Navbar.css";
import { Button } from "@mui/material";
import "./DashBoard.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/system";

function Dashboard() {
  const username = localStorage.getItem("username");
  // on change states
  const [excelFile, setExcelFile] = useState(null);

  const [excelFileError, setExcelFileError] = useState(null);
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  // submit
  const [excelData, setExcelData] = useState(null);
  // const username = useContext(UserContext);
  console.log("uname", username);

  // file handler
  //todo: Add types of files
  const fileType = ["application/vnd.ms-excel"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(typeof data);
      console.log(data);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };
  

  return (
    <div >
      {/* upload file section */}
      Welcome, {username}!
      <div className="dash">
        <div>
      <Line data={data} />
      <Bar data={data} />
      <Pie data={data} />
      </div>
    </div>
      {/* <div className="rowC"> */}
      {/* <Box sx={{ width: "150vh" }} options={{ responsive: true, maintainAspectRatio: false }}>
        <Line data={data} />
       
      </Box>
      <Box sx={{  width: "80vh" }} options={{ responsive: true, maintainAspectRatio: false }}>

      <Pie data={data} />
      </Box>
      
      <Box sx={{  width: "80vh", }} options={{ responsive: true, maintainAspectRatio: false }}>

<Bar data={data} />
</Box> */}
{/* </div> */}
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload Excel file</h5>
          </label>
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: 5 + "px" }}>
              {excelFileError}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginTop: 5 + "px" }}
          >
            Submit
          </button>
        </form>
      </div>
      <br></br>
      <hr></hr>
      {/* view file section */}
      <div className="sendExcelData">
        <h5>View Excel file</h5>
        <button
          onClick={() => setExcelData(null)}
          className="btn btn-success"
          style={{ marginTop: 5 + "px" }}
        >
          Send Data
        </button>
      </div>
      <div className="viewer">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Role</th>
                  <th scope="col">Date</th>
                  <th scope="col">Internship Duration</th>
                  <th scope="col">Intake</th>
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
