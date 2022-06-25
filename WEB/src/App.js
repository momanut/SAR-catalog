import React, { Component } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,Switch
} from "react-router-dom";
import Cart from './Component/Cart';
import Login from './Component/Login';
import WorkOrder from './Component/WorkOrder'
import Request from './Component/Request'
import Register from './Component/Register'
import Upload from './Component/Upload'
import ReadingSHP from './Component/readingshp'
import Cosmo from './Component/Cosmo'
import Radar from './Component/Radar'
import Request2 from './Component/Request2';
import MailSender from './Component/mailSender'
import ExcelExport from './Component/ExcelExport'
import EditRequest from './Component/EditRequest'
import History from './Component/History';
import SettingArea from './Component/SettingArea';

class App extends Component {
  render(){
    return (
      <BrowserRouter>          
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/workorder' element={<WorkOrder />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/register' element={<Register />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/readshp' element={<ReadingSHP />} />
            <Route path='/cosmo' element={<Cosmo />} />
            <Route path='/radar' element={<Radar />} />
            <Route path='/request' element={<Request2 />} />
            <Route path='/mailsender' element={<MailSender />} />
            <Route path='/excelexport' element={<ExcelExport />} />
            <Route path='/editrequest' element={<EditRequest />} />
            <Route path='/history' element={<History />} />
            <Route path='/settingarea' element={<SettingArea />} />
            
            {/* <Route path='*' /> */}
          </Routes>
      </BrowserRouter>
        
    );
  }
  
}

export default App;
