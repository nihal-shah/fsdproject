import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function loginuser() {
        fetch("http://localhost:4000/demo/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Set the Content-Type header to application/json
            },
            body: JSON.stringify({email, password}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "pass incorrect") {
                    toast("incorrect password", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                    });
                } else if (data.message === "email incorrect") {
                    toast("email not exist", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                    });
                } else if (data.message === "success") {
                    toast("successfull login", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                    })
                    navigate("/home",{state:email});
                }
            })
            .catch(error => {
                console.log("Error: " + error.message);
            });
    }

    return(
        <Form>
            <FormGroup>
                <Label
                    for="exampleEmail"
                    hidden
                >
                    Email
                </Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label
                    for="examplePassword"
                    hidden
                >
                    Password
                </Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e)=>{setPassword(e.target.value);}}
                />
            </FormGroup>
            {' '}
            <Button onClick={loginuser}>
                Submit
            </Button>
            <ToastContainer />
        </Form>
    );
}

export default Login;