import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {/* Home */}
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            {/* Courses */}
            <li className="navbar-item">
              <Link to="/courses" className="nav-link">
                Courses
              </Link>
            </li>

            {/* Registration */}
            <li className="navbar-item">
              <Link to="/registration" className="nav-link">
                Registration
              </Link>
            </li>

            {/* AddInfoToDatabase */}
            <li className="navbar-item">
              <Link to="/addinfo" className="nav-link">
                AddInfo
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
