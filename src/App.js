import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import questions from './klausimai.json';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Use HashRouter
import Testai from './Testai'; 
import Klausimai from './Klausimai'; 




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Testai />} />
        <Route path="/klausimai" element={<Klausimai />} /> 
      </Routes>
    </Router>
  );
}

export default App;