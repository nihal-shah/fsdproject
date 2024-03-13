import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button, Card, CardBody, CardColumns, CardImg, CardTitle } from "reactstrap";
import Header from "./Header";

function Fullblog() {
    const [like, setLike] = useState(false);
    const [blogid, setBlogid] = useState(null);
    const [blogtitle, setBlogtitle] = useState(null);
    const [blogbody, setBlogbody] = useState(null);
    const [blogimage, setBlogimage] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const [email, setEmail] = useState(location.state);

    useEffect(() => {
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

        async function fetchLike() {
            try {
                const response = await fetch(`http://localhost:4000/demo/getlikeblog/${id}/${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setLike(data.message === "exist");
            } catch (error) {
                console.error('Error fetching like:', error);
            }
        }

        fetchData();
        fetchLike();
    }, [id, email]);

    async function updatelike() {
        try {
            const response = await fetch(`http://localhost:4000/demo/bloglikes/${id}/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            // Handle "like added" and "like remove" differently
            if (data.message === "like added") {
                setLike(true);
            } else if (data.message === "like remove") {
                setLike(false);
            }
        } catch (error) {
            console.error('Error fetching like:', error);
        }
    }

    return (
        <div>
        <Header validemail={email}/>
        <div className="d-flex justify-content-center mt-5">
            <ToastContainer />
            <CardColumns>
                <Card className="mb-2" style={{ width: "600px", marginTop: "50px" }}>
                    <div className="row">
                        <div className="col-md-6">
                            <CardImg
                                className="postImg"
                                alt="first Image"
                                src={blogimage}
                                style={{ width: "600px", height: "243px", borderRadius: "5px 5px 0 0" }}
                            />
                        </div>
                    </div>
                    <CardBody>
                        <CardTitle tag="h3">{blogtitle}</CardTitle>
                        <CardTitle tag="h3">{blogbody}</CardTitle>
                        <div className="d-flex justify-content-end">
                            {like ? (
                                    <Button className="Button" style={{ background: "green" }} onClick={updatelike}>
                                        dislike
                                    </Button>

                            ) : (
                                <Button className="Button" style={{ background: "gray" }} onClick={updatelike}>
                                    like
                                </Button>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </CardColumns>
        </div>
        </div>
    );
}

export default Fullblog;
