import './Header.css'
import { Link } from 'react-router-dom';
import logo from "./logo.png"
function Header() {

    return (
        <div className="Container">
            <div id='logo'><img src={logo} alt="Logo" /></div>

            <nav>
                <div class="topnav">
                <Link className="line"to="/Home">HOME</Link>
                <Link className="line"to="/Profile">PROFILE</Link>
                <Link className="line"to="/Create">CREATE</Link>
            </div>
            </nav>
        </div>
    );
}

export default Header;

