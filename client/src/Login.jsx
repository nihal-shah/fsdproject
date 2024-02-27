import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function loginuser() {
    const email = document.getElementById("exampleEmail").value;
    const password = document.getElementById("examplePassword").value;

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
            }
        })
        .catch(error => {
            console.log("Error: " + error.message);
        });
}
function Login(){
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