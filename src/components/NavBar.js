import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {

  render() {
    return (
      <nav class="navbar navbar-default">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/posts/new">Add Post</Link>

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
