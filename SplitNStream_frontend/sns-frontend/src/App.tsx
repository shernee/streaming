import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from 'pages/login'
import { Home } from 'pages/home'
import { GroupList } from 'pages/group-list';
import { GroupDetail } from 'pages/group-detail';
import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/group-list/:subscriptionId" element={<GroupList />} />
        <Route path="/group-detail/:GroupId" element={<GroupDetail />} />
      </Routes>
    </div>
  );
}

export default App;
