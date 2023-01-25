import React from 'react';
import { FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';
import { useState } from "react";
import './style.css';
import { baseApiURL } from '../config/env.js';
function UploadParseCsv(props) {
    //posting the csv file to api, for data parsing

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
     
    // It will store the file uploaded by the user
    const [file, setFile] = useState("");
    const allowedExtensions = ["csv"];
  const fileHandler = (e) => {

    setError("");
         
    // Check if user has entered the file
    if (e.target.files.length) {
        const inputFile = e.target.files[0];
         
        // Check the file extensions, if it not
        // included in the allowed extensions
        // we show the error
        const fileExtension = inputFile?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            setError("Please input a csv file");
            return;
        }

        // If input type is correct set the state
        setFile(inputFile);
    }

    
  };
  const handleParse = () => {
         
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();
     
    // Event listener on reader when the file
    // loads, we parse it and set the data.
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios({
      method: "post",
      url: `${baseApiURL}api/v1/productFeed/upload/`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setSuccess("Successfully uploaded");
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        setError("Some error.Please try again");
        console.log(response);
      });
};
   return(
     <div>
      <label htmlFor="csvInput" style={{ display: "block" }}>
                <div class="uploadText">Upload Excel file to insert Pricing Feed Data for XYZ store.</div>
      </label>
       <FormGroup class="uploadText">
          <Input 
          type="file"
          name="file" 
          id="exampleFile" 
          onChange={(e) => fileHandler(e)}/>
          <button onClick={handleParse}>Upload</button>
          <span >
                {error ? error : success}
            </span>
        </FormGroup>
        
        <div
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
      >
        <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />

        <div>
          <p style={{width: '200px', textAlign: 'center'}}>Product Feed Data</p>
        </div>

        <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
      </div>
        
        
        
     </div> 
)
}

export default  UploadParseCsv;