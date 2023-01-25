import React, {useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import DatePicker from "react-datepicker";
import DateObject from "react-date-object";
import { baseApiURL } from '../config/env.js';
const axios = require('axios');


function PriceFeedForm({parentToChild}) {
    const [storeId , setstoreId] = useState();
    const [SKU , setSKU] = useState('');
    const [productName , setProductName] = useState('');
    const [price , setPrice] = useState('');
    const [date , setDate] = useState('');
    const [itemId , setItemId] = useState('');
    const [saveStatus , setSaveStatus] = useState('');
    const [apiResponse , setApiResponse] = useState('0');
    // 1- Success
    //   2- Error
    // 3- Not submitted form
    //datePickerIsOpen: false,
    const [datePickerIsOpen , setDatePickerIsOpen] = useState(false);
   
  useEffect(() => {
        setstoreId(parentToChild.storeId)
    
        setSKU(parentToChild.productSKU)
        setProductName(parentToChild.productName)
        setPrice(parentToChild.productPrice)
        setItemId(parentToChild.itemId)
        setSaveStatus("")
        setApiResponse("0")
        var input = parentToChild.productSaleDate
       
        if(input !="")
        {
        const anotherDate = new Date(input);
        setDate(anotherDate)
        }
  }, [parentToChild])

    // function to update state of name with
    // value enter by user in form
    const handleStoreIdChange =(e)=>{
     
      setstoreId(e.target.value);
      setSaveStatus("")
      setApiResponse("0")
    }
    // function to update state of age with value
    // enter by user in form
    const handleProductNameChange =(e)=>{
      setProductName(e.target.value);
      setSaveStatus("")
      setApiResponse("0")
    }
    // function to update state of email with value
    // enter by user in form
    const handleSKUChange =(e)=>{
      setSKU(e.target.value);
      setSaveStatus("")
      setApiResponse("0")
    }
      // function to update state of password with
      // value enter by user in form
    const handlePriceChange =(e)=>{
      setPrice(e.target.value);
      setSaveStatus("")
      setApiResponse("0")
    }
      // function to update state of confirm password
      // with value enter by user in form
    
    // below function will be called when user
    // click on submit button .
    const handleSubmitNew=(e)=>{
     
     {
        
    let dateFinal = date.getFullYear()+'-'+ parseInt(date.getMonth() + 1) + '-' +date.getDate();
    
    const data = { "productSKU": SKU,"productName":productName,"productSaleDate":dateFinal, "productPrice":price,"storeId":storeId };
    
    axios({
          method: "put",
          url: `${baseApiURL}/api/v1/productFeed/${parentToChild.itemId}/`,
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            
            setApiResponse("1")
            setSaveStatus("Data Successfully Updated.")
            
          })
          .catch(function (response) {
            //handle error
            setApiResponse("1")
            setSaveStatus("Error")
            
          });

               
      }
      //e.preventDefault();
 
    }

    
  const handleDateChange =(e)=>{
    setDate(e.target.value);
    setSaveStatus("")
    setApiResponse("0")
  }
  
  const openDatePicker=(e)=> {
       setDatePickerIsOpen(!datePickerIsOpen);
  };


  return (
    <div className="App">
    <header className="App-header">
    <h3> Edit Form </h3>
    {parentToChild.storeId}
        <label class="marginAboveInput">
          Store Id:
        </label><br/>
        <input class="marginAboveInput" type="text" value={storeId} required onChange={(e)=> {handleStoreIdChange(e)}} /><br/>
          { /*when user write in name input box , handleChange()
              function will be called. */}

    <label class="marginAboveInput">
          SKU:
      </label><br/>
        <input class="marginAboveInput" type="text" value={SKU} required onChange={(e)=> {handleSKUChange(e)}} /><br/>
          { /*when user write in name input box , handleChange()
              function will be called. */}

    <label class="marginAboveInput">
          Product Name:
      </label><br/>
        <input type="text" class="marginAboveInput" value={productName} required onChange={(e)=> {handleProductNameChange(e)}} /><br/>
          { /*when user write in name input box , handleChange()
              function will be called. */}

    <label class="marginAboveInput">
          Price:
      </label><br/>
        <input type="text" class="marginAboveInput" value={price} required onChange={(e)=> {handlePriceChange(e)}} /><br/>
          { /*when user write in name input box , handleChange()
              function will be called. */}

    <label class="marginAboveInput">
          Date:
      </label><br/>
       { /*<input type="text" value={date} required onChange={(e)=> {handleDateChange(e)}} /><br/>*/}
          { /*when user write in name input box , handleChange()
              function will be called. */}
      <DatePicker
          selected={date}
          onChange={(date) => { console.log("ttttttttttttttt"); console.log(date); setDate(date);  setSaveStatus(""); setApiResponse("0"); }}
          onClickOutside={(e)=> {openDatePicker(e)}}
          dateFormat="dd-MM-yyyy" 
         
          class="marginAboveInput"
        />
        
        <button onClick={() => handleSubmitNew()}>
        Edit
      </button>
      {apiResponse== "1" ? saveStatus:""}
      {//</form>
}
    </header>
    </div>
  );
}
 
export default  PriceFeedForm;