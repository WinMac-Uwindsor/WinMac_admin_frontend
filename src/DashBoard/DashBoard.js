import { useEffect, useState } from "react";
import { Data } from "../Components/DashboardData";
import * as XLSX from "xlsx";
import Chart from "chart.js/auto";

import { UserContext } from "../App";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../Navbar.css";
import "./DashBoard.css";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  countByRoles,
  topCompaniesByStudents,
  studentsPlaced,
  scrappedData,
} from "../JsonData/VisualizationData";

function Dashboard() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  function getRandomColors(length) {
    const colors = [];
    for (let i = 0; i < length; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      colors.push(`rgba(${red}, ${green}, ${blue}, 0.7)`);
    }
    return colors;
  }
  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }
  useEffect(() => {
    // if (username === null) {
    //   navigate("/login");
    // }
  }, []);
  // on change states
  const [excelFile, setExcelFile] = useState(null);

  const [excelFileError, setExcelFileError] = useState(null);
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  Object.keys(studentsPlaced[0]).forEach((company, index) => {
    const numPositions = Object.values(studentsPlaced[0][company]).reduce(
      (a, b) => a + b
    );
    const color = `hsl(${(index * 50) % 360}, 70%, 50%)`;
    data.labels.push(company);
    data.datasets[0].data.push(numPositions);
    data.datasets[0].backgroundColor.push(color);
  });

  const countByRolesData = {
    labels: countByRoles.map((e) =>
      e.job_titles
        
    ),
    datasets: [
      {
        label: "",
        backgroundColor: getRandomColors(countByRoles.length),
        borderColor: "rgb(255, 99, 132)",
        data: countByRoles.map((e) => e.company),
        fill: true,
      },
    ],
  };

  const topCompaniesData = {
    labels: topCompaniesByStudents.map((e) =>
      e.Company
        
    ),
    datasets: [
      {
        label: "",
        backgroundColor: getRandomColors(topCompaniesByStudents.length),
        borderColor: "rgb(255, 99, 132)",
        data: topCompaniesByStudents.map((e) => e.num_students),
        fill: true,
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
    <>
      {/* upload file section */}
      {/* <Line data={data} /> */}
      {/* <Bar data={countByRolesData}  />
      <Bar data={data} /> */}
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 0.5fr)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Count By Roles </h1>
        <Item>
          <Bar data={countByRolesData} />
        </Item>
       
        <h1>No. of Students Placed in different Companies </h1>
        <Item>
          <Doughnut data={data} />
        </Item>
        <h1>Job Offers by Top Companies</h1>
        <Item>
          <Line data={topCompaniesData} />
        </Item>
      </Box>
      {/* <Pie data={data} /> */}
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

      <h1 style={{ paddingLeft: '50px' }}>Skills Required for Specific Job Roles</h1>
      <TableContainer component={Paper} sx={{padding:"50px" , borderRadius:"20px"}}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#2196f3" }}>
              <TableCell sx={{ color: "#fff" }}>Company</TableCell>
              <TableCell sx={{ color: "#fff" }}>Job Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Skills</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scrappedData.map((item, index) => (
              <TableRow
                key={item.job_titles}
                sx={{ background: index % 2 === 0 ? "#f2f2f2" : "#fff" }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  {item.company.toUpperCase()}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {item.job_titles.toUpperCase()}
                </TableCell>
                <TableCell>{item.skills}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
}

export default Dashboard;
