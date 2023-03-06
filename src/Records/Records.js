
import {useState} from 'react'
import {RecordsData} from '../Components/RecordsData'
import * as XLSX from 'xlsx'
import "../Navbar.css"
import"../DashBoard/DashBoard.css"

function Records() {
  const username = localStorage.getItem('username');

  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
 
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

  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }
  
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
          style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */} <div className='sendExcelData'>
      <h5>View Excel file</h5>
      <button onClick={()=>
      setExcelData(null)} className='btn btn-success'
          style={{marginTop:5+'px'}}>Send Data</button>
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