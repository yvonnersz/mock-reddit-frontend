  
import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {

  return (
    <div>
      <Link to='/posts'>Posts</Link>
      <Link to='/posts/new'>Add Post</Link>
    </div>

  )
}

export default NavBar