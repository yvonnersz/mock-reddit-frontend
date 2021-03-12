import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  let register = !props.user ? <button type='button' class='btn btn-primary rounded-pill pl-5 pr-5' data-bs-toggle='modal' data-bs-target='#signup-modal'> Sign Up </button> : null;
  let login = !props.user ? <button type='button' class='btn btn-outline-primary rounded-pill pl-5 pr-5' data-bs-toggle='modal' data-bs-target='#login-modal'> Log In </button> : null;
  let logout = props.user ? <button type='button' class='btn btn-outline-primary rounded-pill pl-5 pr-5' onClick={props.handleLogOut}> Log Out </button> : null;

  return (
    <>
      <nav class='navbar sticky-top bg-light'>

        <Link to='/'>Mock Reddit</Link>

        <div class='d-grid gap-2 d-md-flex justify-content-md-end'>
          {login}
          {register}
          {logout}
        </div>

      </nav>
    </>
  )
}

export default NavBar;
