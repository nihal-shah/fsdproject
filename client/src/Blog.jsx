import React from "react";
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





    return (
        <div className="d-flex justify-content-center mt-5">
            <ToastContainer />
            <CardColumns>
                <Card className="mb-2" style={{ width: "600px", marginTop: "50px" }}>
                    <div className="row">
                        <div className="col-md-6">
                            <CardImg className="postImg" alt="first Image"
                                     src={props.image}
                                     style={{ width: "600px", height: "243px",borderRadius: "5px 0 0 0",border:"5px"}}
                            />
                        </div>
                    </div>
                    <CardBody>
                        <CardTitle tag="h3">{props.title}</CardTitle>
                        <CardText>{props.body}</CardText>
                    </CardBody>
                </Card>
            </CardColumns>
        </div>

    );
}
export default Blog;