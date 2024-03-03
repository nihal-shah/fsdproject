import React, { useState } from "react";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "./Header";

function CreateBlog() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email] = useState(location.state); // If email is not changing, you can directly use it in the fetch
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category,setCategory]=useState("");
    const [image, setImage] = useState(null);
    console.log("create blog: "+email);
    const submitForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/demo/createblog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ blog: { title: title, body: body,category:category }, email: email }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log("id 1=" + data.id);
                uploadImage(data.id);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const uploadImage = (id) => {
        const formData = new FormData();
        formData.append('blogId', id);
        formData.append('Image', image);

        fetch('http://localhost:4000/demo/uploadimage', {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Image uploaded: ', data);
                toast.success('Blog created and Image uploaded successfully!');
                navigate("/home",{state:email});
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

    return (
        <div>
            <Header validemail={email}/>
            <Form style={{ width: "900px", marginTop: "50px", marginLeft: "280px" }}>
                <h1>Create new Blog</h1>
                <br></br>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="title" placeholder="Enter your title" type="input" onChange={(e) => setTitle(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input id="body" placeholder="Write your body" name="body" type="textarea" onChange={(e) => setBody(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="category">Category</Label>
                    <Input id="category" placeholder="category" name="category" type="input" onChange={(e) => setCategory(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Upload Event Image</Label>
                    <Input id="image" name="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
                </FormGroup>
                <Button color="success" type="submit" onClick={submitForm}>Submit</Button>
            </Form>
            <ToastContainer />
        </div>
    );
}

export default CreateBlog;
