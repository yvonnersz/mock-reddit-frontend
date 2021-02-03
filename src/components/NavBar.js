import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {

  render() {
    return (
      <nav class="navbar">
        <Link to="/">Home</Link>

        {this.props.user ? <Link to="/logout" onClick={this.props.handleLogOut}>Logout</Link> : 
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link> 
          </>
        }


        
      </nav>
    );
  }
}

export default NavBar;
