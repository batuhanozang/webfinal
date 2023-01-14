import logo from "../Assets/logo.png";
import "../Assets/Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-item-img">
          <img src={logo} className="logo" alt=""></img>
        </div>

        <div className="navbar-item">
          <Link to="/" className="navbar-item-text">Home</Link>
        </div>
        <div className="navbar-item">
          <Link to="/stock" className="navbar-item-text">Stock</Link>
        </div>
        <div className="navbar-item">
          <Link to="/contact" className="navbar-item-text">Contact</Link>
        </div>
        <div className="navbar-item">
          <Link to="/sign-in" className="navbar-item-text">Sign in</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
