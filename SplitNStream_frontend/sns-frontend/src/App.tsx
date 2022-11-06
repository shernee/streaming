import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from 'pages/login'
import { Home } from 'pages/home'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
