import { useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";

function Home(){
    const location = useLocation();
    const [email,setEmail]=useState(location.state);

    return(
        <div>
            <h1>Hello {email}</h1>
        </div>
    );
}

export default Home;