import React from "react";
import "./Header.css"
import {Link} from "react-router-dom";
import Home from "./Home";
function Header(props){
    const email=props.validemail;
    console.log("email in header:"+email);
    return(
        <div>
            <ul className="ulHeader">
                <li className="liHeader"><Link to="/home" className="LinkHeader" state={email}>Home</Link></li>
                {email === "n@gmail.com" ?
                    <li className="liHeader"><Link to="/createpost" state={email} className="LinkHeader">UPLOAD</Link>
                    </li> : null}
                <li className="liHeader"><Link to="/cricket" className="LinkHeader" state={email}>CRICKET</Link></li>
                <li className="liHeader"><Link to="/stockmarket" className="LinkHeader" state={email}>STOCK MARKTE</Link></li>
                <li className="liHeader"><Link to="/logout" className="LinkHeader">LOGOUT</Link></li>
            </ul>
        </div>
    );
}

export default Header;