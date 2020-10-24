  
import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {

  return (
    <nav class="navbar navbar-default">
      <Link to='/'>Home</Link>
      <Link to='/posts'>Posts</Link>
      <Link to='/posts/new'>Add Post</Link>
    </nav>

  )
}

export default NavBar