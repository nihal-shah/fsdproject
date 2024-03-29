import logo from './logo.svg';
import './App.css';
import Login from "./Login"
import Home from "./Home"
import React from "react";
import {Routes,Route} from "react-router-dom"
import CreateBlog from "./CreateBlog";
import Cricket from "./Cricket";
import Stockmarket from "./Stockmarket";
import Fullblog from "./Fullblog";
import Registration from "./Registration";
import Like from "./Like";
function App() {
  return (
    <div>
      <Routes>
          <Route path="" element={<Login/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="createpost" element={<CreateBlog/>}/>
          <Route path="cricket" element={<Cricket/>}/>
          <Route path="Like" element={<Like/>}/>
          <Route path="stockmarket" element={<Stockmarket/>}/>
          <Route path="/fullblog/:id" element={<Fullblog/>}/>
      </Routes>
    </div>
  );
}

export default App;
