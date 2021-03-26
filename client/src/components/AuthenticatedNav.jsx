import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const AuthenticatedNav = (props) => {

  const myProfile = props.currentUser.handle

  console.log('myProfile:', myProfile)


  return (
    
    <div>
      <NavLink to="/">
        <button className="nav-buttons">HOME</button>
      </NavLink>
      <NavLink to="/userlist">
        <button className="nav-buttons">All Users</button>
      </NavLink>
      <NavLink to="/user/{myProfile}">
        <button className="nav-buttons">myProfile</button>
      </NavLink>
      <button className="nav-buttons" onClick={() => props.logOut()}>Logout</button>

    </div>
  )
}

export default AuthenticatedNav
