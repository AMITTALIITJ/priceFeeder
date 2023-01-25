import React from 'react';
import axios from 'axios';
import { Loader, Pagination } from './components';
import { baseApiURL } from './config/env.js';
import './App.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import PriceFeedForm from './formSubmission/PriceFeedForm';
class PaginationMain extends React.Component {
  constructor(props) {
   
    
    super(props);
    this.state = {
      showLoader: false,
      listItems: [],
      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: '',
      storeId:'',
      itemId : '', 
      productSKU :'', 
      productName:'', 
      productSaleDate:'', 
      productPrice:'',
      storeIdFilter:'',
      productSKUFilter:'',
      productNameFilter:'',
      dateFromFilter:'',
      dateToFilter:'',
      priceFromFilter:'',
      priceToFilter:'',
      isEditForm: false
    }
  }

  

  componentDidMount() {
    this.loadListItem();
  }

  


  loadListItem () {
    this.setState({ showLoader: true });
    axios.get(`${baseApiURL}api/v1/productFeed/?page=${this.state.page}&page_size=${this.state.recordsPerPage}`)
      .then(response => {
        console.log("pagination====="+response)
        console.log(response)
        const totalPages = Math.floor(response.data.count / this.state.recordsPerPage) // Calculate total records
        this.setState({ showLoader: false, listItems: response.data.results, totalPages: totalPages, totalRecords:  response.data.count})
      })
      
      console.log("state2",this.state)
  }

  onChangeRecordsPerPage (event) {
    this.setState ({ recordsPerPage: parseInt(event.target.value) }, () => {
      this.loadListItem()
    })
  }

  gotoPage () {
    if (!isNaN(parseInt(this.state.enterpageno))) {
      this.setState({ page: parseInt(this.state.enterpageno) })
      this.loadListItem()
    }
  }

  onPageChanged (page) {
    this.setState ({ page: page }, () => {
      this.loadListItem()
    })
  }

  inputPageChange = (e) => {
    if (!isNaN(parseInt(e.target.value))) {
      this.setState({ enterpageno: parseInt(e.target.value) })
    }
  }
  onClickCaptureHandler = (id1, productSKU1, productName1, productSaleDate1, storeId1, productPrice1) => {
    
    this.setState({ storeId: storeId1 , itemId: id1,productSKU: productSKU1,productName: productName1,productSaleDate: productSaleDate1, productPrice: productPrice1, isEditForm: true});
    
  };

  onClickApplyCaptureHandler = (id1, productSKU1, productName1, productSaleDate1, storeId1, productPrice1) => {
    
    //this.setState({ page: 1 })
    this.setState({ showLoader: true, page :1,enterpageno:'1'  });
    axios.get(`${baseApiURL}api/v1/productFeed/?page=${1}&page_size=${this.state.recordsPerPage}&productName=${this.state.productNameFilter}&productSKU=${this.state.productSKUFilter}&productPrice__gt=${this.state.priceFromFilter}&productPrice__lt=${this.state.priceToFilter}&storeId=${this.state.storeIdFilter}`)
      .then(response => {
        
        const totalPages = Math.floor(response.data.count / this.state.recordsPerPage) // Calculate total records
        this.setState({ showLoader: false, listItems: response.data.results, totalPages: totalPages, totalRecords:  response.data.count})
      })
      console.log("state1",this.state)
  };

  onClickChangeFromPriceHandler = (e) => {
   
    let value = e.target.value.replace(/\D/g, "");
    let bar = '' + value;
    this.setState({ priceFromFilter: bar })
    
    console.log(bar)
  };
  onClickChangeToPriceHandler = (e) => {
   
    let value = e.target.value.replace(/\D/g, "");
    let bar = '' + value;
    this.setState({ priceToFilter: bar })
    console.log(bar)
  };
  onClickChangeStoreIdHandler = (e) => {
   
    //let value = e.target.value.replace(/\D/g, "");
    let value = e.target.value
    let bar = '' + value;
    this.setState({ storeIdFilter: bar })
    console.log(bar)
  };
  onClickChangeProductSKUHandler = (e) => {
   
    //let value = e.target.value.replace(/\D/g, "");
    let value = e.target.value
    let bar = '' + value;
    this.setState({ productSKUFilter: bar })
    console.log(bar)
  };
  onClickChangeProductNameHandler = (e) => {
    let value = e.target.value
    let bar = '' + value;
    this.setState({ productNameFilter: bar })
    console.log(bar)
  }

  
  render() {
    return (

      <div className='rowC'>
      <div className="App">
        <Loader loading={this.state.showLoader} />
        <div>
        <div>
        <div class="topFilter">Filters</div>
        <div class="topFilterPadding">
          Store Id
          <input type="text" value={this.state.storeIdFilter} onChange={(e)=> (this.onClickChangeStoreIdHandler(e))} />
         
        <span>|</span>
        
          SKU
          <input type="text" value={this.state.productSKUFilter} onChange={(e)=> (this.onClickChangeProductSKUHandler(e))} />
         
          <span>|</span>
        
          Product Name
          <input type="text" value={this.state.productNameFilter} onChange={(e)=> (this.onClickChangeProductNameHandler(e))} />
          
          <span>|</span>
          From Price
          <input value={this.state.priceFromFilter} onChange={(e)=> (this.onClickChangeFromPriceHandler(e))} />
         
        
        
          To Price
          <input value={this.state.priceToFilter} onChange={(e)=> (this.onClickChangeToPriceHandler(e))} />
    
        </div>
        
       <div>
              </div>
        
        <button onClick={() => this.onClickApplyCaptureHandler()}>
        Apply
      </button>
      </div>
        <h2>Product Feed Details</h2>
        <ul className="flex-container">
        {
          this.state.listItems.map((item, index) => {

            let input = item.productSaleDate
            let [year, month, day] =  input.split('-')
            let dataF = day+"-"+month+"-"+year;
           
           return (<li key={item.id} className="flex-item">
              <h4>Product SKU   : {item.productSKU}</h4>
              <h4>Product Name  : {item.productName }</h4>
              <h4>Product Name  : {dataF} </h4>
              <h4>Store Id      : {item.storeId }</h4>
              <h4>Product Price : {item.productPrice }</h4>
              <button onClick={() => this.onClickCaptureHandler(item.id, item.productSKU, item.productName, item.productSaleDate, item.storeId, item.productPrice)}>
        Edit
      </button>
      
            </li>)
          })
        }
        {
          this.state.listItems.length === 0 ? 
          <li className="flex-item center">No Record Found</li>: <li />
        }
        </ul>
        <ul className="showItems">
          <li>Show Items:
            <select onChange={ (e) => { this.onChangeRecordsPerPage(e) } }>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </li>
          <li>
            Go to Page <input type="text" value={this.state.enterpageno} onChange={(e) => { this.inputPageChange(e)} } /><button type="button" onClick={ () => this.gotoPage() }>Go</button>
          </li>
        </ul>
        {
          this.state.listItems.length > 0 ?
          <Pagination totalPages={this.state.totalPages} currentPage={this.state.page} maxVisibleButtons={ 3 } onPageChanged={ (e) => this.onPageChanged(e) }/> : <div />
        }
        </div>
      </div> 
      
       <PriceFeedForm parentToChild={this.state} handler = {this.handler}/>

      
      </div>
    );
  }
}

export default PaginationMain;