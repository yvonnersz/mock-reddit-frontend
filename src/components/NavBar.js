import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  let register = !props.user ? 'Register' : null;
  let login = !props.user ? 'Login' : null;
  let logout = props.user ? 'Logout' : null;

  return (
    <nav class="navbar sticky-top bg-light">

      <Link to="/">Home</Link>

      <Link to='/register'>
        <span>{register}</span>
      </Link>

      <Link to='/login'>
        <span>{login}</span>
      </Link>

      <Link to='/login' onClick={props.handleLogOut}>
        <span>{logout}</span>
      </Link>

    </nav>
  )
}


export default NavBar;
