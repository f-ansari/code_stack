import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const AuthenticatedNav = (props) => {
  // console.log(props.logOut)
  return (
    <div>
      <NavLink to="/">
        <button className="nav-buttons">HOME</button>
      </NavLink>
      <button className="nav-buttons" onClick={() => props.logOut()}>Logout</button>

    </div>
  )
}

export default AuthenticatedNav
