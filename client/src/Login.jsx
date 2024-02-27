import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login(){
    function loginuser(){
        const email = document.getElementById("exampleEmail").value;
        const password = document.getElementById("examplePassword").value;

        fetch("http://localhost:4000/demo/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Set the Content-Type header to application/json
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response)=>{if(response==="pass incorrect"){
                console.log("incorrect password");
            }
            else if(response==="email incorrect"){
                console.log("email not exist");
            }
            else if(response==="success"){
                console.log("successfull login");
            }}).catch(error => {
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
        </Form>
    );
}

export default Login;