import React from 'react';
import "./blogcreation.css"
import {Link} from "react-router-dom"
const form = () => {
  return (
    <div className="container">
      <h1>Create post</h1>
     
        <div id="editForm">
          <input type="text" name="title"/>
          <textarea id="content" rows="10"></textarea>
          <input type='file'/>
        </div>
      <Link className="button" to="/home"><button>submit</button> </Link>
    </div>
  );
};

export default form;