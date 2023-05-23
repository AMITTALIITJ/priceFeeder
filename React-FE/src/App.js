import React, { useState } from "react";
import Papa from "papaparse";
import PaginationMain from './PaginationMain';
import UploadParseCsv from './csvUpload/UploadParseCsv';

const App = () => {
     
   
    return (
        <div>
            <div class="pricingHeader">Pricing Feeder</div>
            <UploadParseCsv />
            <PaginationMain />
        </div>
    );








    
};
//testing hot
export default App;