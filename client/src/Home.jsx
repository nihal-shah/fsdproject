import { useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";

function Home(){
    const location = useLocation();
    const [username,setUsername]= useState();
    useEffect(() => {
        fetch("http://localhost:4000/demo/getDetails",{
            method:"POST",
            body:JSON.stringify({token: location.state.token})
        })
            .then(response => response.json())
            .then(data=>{
                setUsername(data.message);
            })
            .catch(error => {
                console.log("Error: " + error.message);
            });

    }, []);


    return(
        <div>
            <h1>Hello {username}</h1>
        </div>
    );
}

export default Home;