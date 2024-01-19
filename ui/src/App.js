import './App.css';
import './strings.js'
import API from './api';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import Elements from './pages/elements';
import Login from './pages/login';
import Home from './pages/home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUserPhoto from './pages/edit-up/index.js';

function App() {

  var deviceInfo = useRef()

  if(!deviceInfo.current){
    const UAParser = require('ua-parser-js')
    const info = new UAParser().setUA(navigator.userAgent).getResult()
    deviceInfo.current = {
      isComp: info.os.name!="Android"
    }
  }
  
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/elements" element={<Elements/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/edit-up" element={<EditUserPhoto deviceInfo={deviceInfo.current}/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          {/* <Route path="/reg/:id" element={<RegForm/>}></Route> */}
        </Routes>
    </Router>
    <ToastContainer />
    </div>
  );
}

export default App;
