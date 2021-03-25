import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const AuthenticatedNav = (props) => {
  // console.log(props.logOut)
  return (
    <div>
      <NavLink to="/">
        <button className="nav-buttons">HOME</button>
      </NavLink>
      <NavLink to="/user/{props.currentUser}">
        <button className="nav-buttons">myProfile</button>
      </NavLink>
      <button className="nav-buttons" onClick={() => props.logOut()}>Logout</button>

    </div>
  )
}

export default AuthenticatedNav
