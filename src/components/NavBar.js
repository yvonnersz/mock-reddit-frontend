import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {

  handleOnClick = (event) => {
    axios.delete('http://localhost:3000/logged_out', { withCredentials: true})
  }

  render() {
    return (
      <nav class="navbar navbar-default">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/posts/new">Add Post</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout" onClick={this.handleOnClick}>Logout</Link>
      </nav>
    );
  }
}

export default NavBar;
