import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button, Card, CardBody, CardColumns, CardImg, CardTitle } from "reactstrap";

function Fullblog() {
    const[blogid,setBlogid]=useState(null);
    const[blogtitle,setBlogtitle]=useState(null);
    const[blogbody,setBlogbody]=useState(null);
    const[blogimage,setBlogimage]=useState(null);
    const { id } = useParams();
    const [email, setEmail] = useState();
    const location = useLocation();

    useEffect(() => {
        setEmail(location.state);
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:4000/demo/blog/${id}`);
                const data = await response.json();
                setBlogid(data.id);
                setBlogtitle(data.title);
                setBlogbody(data.body);
                setBlogimage(data.image);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]);

    return (
                <div className="d-flex justify-content-center mt-5">
                    <ToastContainer />
                    <CardColumns>
                        <Card className="mb-2" style={{ width: "600px", marginTop: "50px" }}>
                            <div className="row">
                                <div className="col-md-6">
                                    <CardImg
                                        className="postImg"
                                        alt="first Image"
                                        src={blogimage} // Since your API returns a single object, access the first element of the array
                                        style={{ width: "600px", height: "243px", borderRadius: "5px 5px 0 0" }}
                                    />
                                </div>
                            </div>
                            <CardBody>
                                <CardTitle tag="h3">{blogtitle}</CardTitle>
                                <CardTitle tag="h3">{blogbody}</CardTitle>
                                <div className="d-flex justify-content-end">
                                    <Button color="like" className="Button">like</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </CardColumns>
                </div>
    );
}

export default Fullblog;
