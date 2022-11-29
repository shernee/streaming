import React from 'react';
import { GroupDetail } from 'pages/group-detail';
import { Groups } from 'pages/group-list';
import { Payment } from 'pages/payment';
import { Home } from 'pages/home';
import { Login } from 'pages/login';
import { Register } from 'pages/signup';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/group-list/:subscriptionId" element={<Groups />} />
        <Route path="/group-detail/:groupId" element={<GroupDetail />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
