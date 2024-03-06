import React, {useState} from "react";
import "./blog.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    CardColumns,
    Button,
} from "reactstrap";

function Blog(props) {
    const navigate = useNavigate();
    const id  = props.id;
    const [email,setEmail]=useState();
    const handleview = () => {
            setEmail(props.email);
            navigate(`/fullblog/${id}`,{state:email});

    };

    const handleDelete = (e) => {
        e.stopPropagation();
        fetch(`http://localhost:4000/demo/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    toast.success("This post deleted successfully");
                    console.log('Post deleted successfully');
                } else {
                    throw new Error('Failed to delete post');
                }
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                toast.error("Failed to delete this post");
            });
    };


    return (
        <div className="d-flex justify-content-center mt-5">
            <ToastContainer />
            <CardColumns onClick={handleview}>
                <Card className="mb-2" style={{ width: "600px", marginTop: "50px" }}>
                    <div className="row">
                        <div className="col-md-6">
                            <CardImg className="postImg" alt="first Image"
                                     src={props.image}
                                     style={{ width: "600px", height: "243px",borderRadius: "5px 5px 0 0"}}
                            />
                        </div>
                    </div>
                    <CardBody>
                        <CardTitle tag="h3">{props.title}</CardTitle>
                        <div className="d-flex justify-content-end">
                            {props.email==="n@gmail.com"?<Button color="danger" className="Button" onClick={handleDelete}>Delete</Button>:null}
                        </div>
                    </CardBody>
                </Card>
            </CardColumns>
        </div>

    );
}
export default Blog;