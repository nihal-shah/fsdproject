import logo from './logo.svg';
import './App.css';
import Login from "./Login"
import Home from "./Home"
import React from "react";
import {Routes,Route} from "react-router-dom"
import CreateBlog from "./CreateBlog";
function App() {
  return (
    <div>
      <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="createpost" element={<CreateBlog/>}/>
      </Routes>
    </div>
  );
}

export default App;
