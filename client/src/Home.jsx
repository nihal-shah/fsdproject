import { useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";
import Header from "./Header";

function Home(){
    const location = useLocation();
    const [email,setEmail]=useState(location.state);

    return(
        <div>
            <Header validemail={email}/>
            <h1>Hello {email}</h1>
        </div>
    );
}

export default Home;