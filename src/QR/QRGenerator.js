import React, {useState, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import './QRGenerator.css';
import { Button, Card, CardContent, Container, TextField } from '@mui/material';
function QRGenerator() { 
const { myString } = useParams();

// const [text, setText] = useState(myString);
const [imageUrl, setImageUrl] = useState('');
//   const classes = useStyles();
  const qrRef = useRef(null);
  // console.log(text);
  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(myString);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  generateQrCode();
  return (
    
    <div className="conatiner">
          <div>
              {/* <h2 className="title">Generate QR Code </h2> */}
              <div className="body">
                          {/* <TextField label="Enter Event ID here" onChange={(e) => setText(e.target.value)}/> */}
                          {/* <Button className="btn" variant="contained" onClick={() => generateQrCode()}>Generate</Button> */}
                          {/* <Button  variant="contained"  onClick={}>Generate</Button> */}
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>) : null}
                 </div>
              <h2 className="title">Tap QR to Download</h2>
          </div>
    </div>
  );
}


export default QRGenerator;
