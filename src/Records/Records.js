
import {useState} from 'react'
import {RecordsData} from '../Components/RecordsData'
import * as XLSX from 'xlsx'
import "../Navbar.css"
import"../DashBoard/DashBoard.css"
import axios from "axios";

function Records() {
  const username = localStorage.getItem('username');

  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
  const [dataS, setDataS] = useState(null);

 
  // submit
  const [excelData, setExcelData]=useState(null);
 

  // file handler
  //todo: Add types of files
  const fileType=['application/vnd.ms-excel',];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  function SendData(data) {
    console.log("Inside sendData");
    const passStr = data.Password.toString();
    axios
      .post("https://acservices-winmac-admin.onrender.com/winmac/studentData/registerUser", 
      {
        "username": data.Username,
        "password": passStr,
        "email": data.Email,
        "name": data.Name,
        "intake": data.Intake
      })
      .then((response) => {
        console.log("complaint adding success", response.data);
      })
      .catch((error) => {
        console.error("Error adding complaint:", error);
      });
  }

  function addStudents() {
    console.log(dataS);
    if (!dataS) {
      return console.log('empty data cannot be added');
    } else {
      for (var i = 0; i < dataS.length; i++) {
        SendData(dataS[i]);
        setTimeout(() => {console.log("I waited for 1 second.");}, 1000); // 1000 milliseconds = 1 second
      }
      console.log('Students Successfully added ' + dataS.length);
      setExcelData(null);
    }
  }
  


  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      setExcelData(data);
      setDataS(data); // update dataS using setDataS function
    } else {
      setExcelData(null);
      setDataS(null); // update dataS using setDataS function
    }
  };
  
  
  return (
    <div >

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px', backgroundColor:"black"}}>Submit</button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */} <div className='sendExcelData'>
      <h5>View Excel file</h5>
      <button onClick={(data)=>
      addStudents(dataS)} className='btn btn-success'
          style={{marginTop:5+'px', backgroundColor:"black"}}>Send Data</button>
      </div>
     
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  
                  <th scope='col'>Email</th>
                  <th scope='col'>Username</th>
                  <th scope='col'>Password</th>
                  <th scope='col'>Intake</th>
                                   
                </tr>
              </thead>
              <tbody>
                <RecordsData excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>

    </div>
  );
}

export default Records;