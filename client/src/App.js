import logo from './logo.svg';
import './App.css';
import Login from "./Login"
import React from "react";
import {Routes,Route} from "react-router-dom"
function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
