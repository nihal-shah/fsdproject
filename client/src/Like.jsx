import { useLocation } from 'react-router-dom';
import React, {useState,useEffect} from "react";
import Header from "./Header";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blog from "./Blog";
function Like(){
    const location = useLocation();
    const [email,setEmail]=useState(location.state);
    const [blogs  ,setBlogs]=useState([]);
    useEffect(()=>{

        fetch(`http://localhost:4000/demo/getlikeblog/${email}`)
            .then(response => response.json())
            .then(data => {
                setBlogs(data);
                console.log(blogs);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
    return(
        <div>
            <Header validemail={email}/>
            <h1>Hello {email}</h1>
            {blogs.map((blog) => (
                <Blog
                    key ={blog.id}
                    id={blog.id}
                    title={blog.title}
                    image={blog.image}
                    email={email}
                />
            ))}
            <ToastContainer />
        </div>
    );
}

export default Like;