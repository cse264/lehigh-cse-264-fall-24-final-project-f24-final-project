import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LogIn from './pages/Log_In/LogIn';
import NavBar from './pages/navbar/NavBar';


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/navbar" element={<NavBar />} />
      </Routes>
    </Router>
  )
}

export default App;
