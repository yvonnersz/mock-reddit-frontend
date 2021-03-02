import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  let loginLinks = props.user ? <Link to="/logout" onClick={props.handleLogOut}>Logout</Link> : <><Link to="/register">Register</Link><Link to="/login">Login</Link></>;

  return (
    <nav class="navbar sticky-top bg-light">

      <Link to="/">Home</Link>

      { loginLinks }

    </nav>
  )
}


export default NavBar;
