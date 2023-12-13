import './App.css';
import './strings.js'
import API from './api';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { useEffect, useState } from 'react';
import Elements from './pages/elements';
import Login from './pages/login';
import Home from './pages/home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './pages/edit-profile/index.js';

function App() {

  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/elements" element={<Elements/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/edit-Profile" element={<EditProfile/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          {/* <Route path="/reg/:id" element={<RegForm/>}></Route> */}
        </Routes>
    </Router>
    <ToastContainer />
    </div>
  );
}

export default App;
