import logo from './logo.svg';
import './App.css';
import Login from "./Login"
import Home from "./Home"
import React from "react";
import {Routes,Route} from "react-router-dom"
function App() {
  return (
    <div>
      <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
