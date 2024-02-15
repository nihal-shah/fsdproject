import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Home.js"
import Profile from './Profile';
import FullBlog from "./FullBlog";
import Create from "./form";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/FullBlog" element={<FullBlog/>} />
        <Route path="/Create" element={<Create/>} />
        
      </Routes>
    </div>
  );
}

export default App;
