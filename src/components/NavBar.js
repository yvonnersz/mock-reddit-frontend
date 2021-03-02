import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  let logoutLink = props.user ? <Link to="/logout" onClick={props.handleLogOut}>Logout</Link> : null;
  let registerLink = !props.user ? <Link to="/register">Register</Link> : null;
  let loginLink = !props.user ? <Link to="/login">Login</Link> : null;

  return (
    <nav class="navbar sticky-top bg-light">

      <Link to="/">Home</Link>

      { logoutLink }
      { registerLink }
      { loginLink }

    </nav>
  )
}


export default NavBar;
