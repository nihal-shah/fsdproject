import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function registeruser(e) {
        e.preventDefault();
        fetch("http://localhost:4000/demo/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email, password}),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                if (data.message === "User with this email already exists") {
                    console.log("User with this email already exists");
                    toast.error("User with this email already exists", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                    })
                } else if (data.message === "success") {
                    navigate("/login");
                }
            })
            .catch(error => {
                console.log("Error: " + error.message);
            });
    }

    return(
        <form style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "200px",
            backgroundColor: "rgb(57, 62, 70)",
            marginLeft: "400px",
            marginRight: "400px",
            padding: "30px",
            borderRadius: "20px",
        }}>
            <div style={{marginBottom: "5px"}}><label htmlFor="name"
                                                      style={{marginRight: "5px", color: "white"}}>Name</label>
                <input
                    id="name"
                    name="name"
                    placeholder="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div style={{marginBottom: "5px"}}><label htmlFor="exampleEmail"
                                                      style={{marginRight: "5px", color: "white"}}>Email</label>
                <input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div style={{marginBottom: "5px"}}>
                <label htmlFor="examplePassword" style={{marginRight: "5px", color: "white"}}>
                    Password
                </label>
                <input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <button onClick={registeruser} style={{borderRadius: "5px"}}>
                Submit
            </button>
            <ToastContainer/>
        </form>
    );
}

export default Login;