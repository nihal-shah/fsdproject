import "./Profile.css"
import logo from "./logo.png"
import Header from "./Header.js"
function Profile() {
    return (
        <div className="profile">
            <div>
                <Header />
                <img src={logo} alt="User" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            </div>
            <div>
                <h2>Email:user@gmail.com</h2>

            </div>

        </div>

    );
}
export default Profile;