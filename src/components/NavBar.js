import React from "react";
import { Link } from "react-router-dom";
import UserLogin from './users/UserLogin';
import UserInput from './users/UserInput';

const NavBar = props => {
  let register = !props.user ? 'Register' : null;
  let login = !props.user ? 'Login' : null;
  let logout = props.user ? 'Logout' : null;

  return (
    <>
    <nav class="navbar sticky-top bg-light">

      <Link to="/">Home</Link>

      {/* <Link to='/login'>
        <span>{login}</span>
      </Link> */}

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login-modal">
        Log In
      </button>

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signup-modal">
        Sign Up
      </button>

      <button type="button" class="btn btn-primary" onClick={props.handleLogOut}>
        Log Out
      </button>

      {/* <Link to='/register'>
        <span>{register}</span>
      </Link>

      <Link to='/login' onClick={props.handleLogOut}>
        <span>{logout}</span>
      </Link> */}

    </nav>
    <UserLogin handleLogin={props.handleLogin} />
    <UserInput />
    </>
  )
}


export default NavBar;
