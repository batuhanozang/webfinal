import logo from "../Assets/logo.png";
import "../Assets/Navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);

  const signOut = () => {
    removeCookie("authorization");
    alert("Logout Succesful");
  };

  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-item-img">
          <img src={logo} className="logo" alt=""></img>
        </div>

        {cookies.authorization != undefined ? (
          <>
            <div className="navbar-item">
              <Link to="/stock" className="navbar-item-text">
                Stock
              </Link>
            </div>
            <div className="navbar-item" onClick={signOut}>
              <Link to="/" className="navbar-item-text">
                Sign out
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-item">
              <Link to="/" className="navbar-item-text">
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
