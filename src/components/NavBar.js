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

<div class="d-grid gap-2 d-md-flex justify-content-md-end">


      <button type="button" class="btn btn-outline-primary rounded-pill pl-5 pr-5" data-bs-toggle="modal" data-bs-target="#login-modal">
        Log In
      </button>

      <button type="button" class="btn btn-primary rounded-pill pl-5 pr-5" data-bs-toggle="modal" data-bs-target="#signup-modal">
        Sign Up
      </button>

      <button type="button" class="btn btn-outline-primary rounded-pill pl-5 pr-5" onClick={props.handleLogOut}>
        Log Out
      </button>
      </div>

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
