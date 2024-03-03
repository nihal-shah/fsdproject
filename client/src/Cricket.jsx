import { useLocation } from 'react-router-dom';
import React, {useState,useEffect} from "react";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import Blog from "./Blog";
function Cricket(){
    const location = useLocation();
    const [email,setEmail]=useState("");
    const [blogs,setBlogs]=useState([]);
    useEffect(()=>{
        setEmail(location.state);
        fetch("http://localhost:4000/demo/displayblogsCricket")
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
            {blogs.map((blog) => (
                <Blog
                    key ={blog.id}
                    id={blog.id}
                    title={blog.title}
                    body={blog.body}
                    image={blog.image}
                    email={email}
                />
            ))}
        </div>
    );
}

export default Cricket;