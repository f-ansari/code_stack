import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const AuthenticatedNav = (props) => {
  // console.log(props.logOut)
  return (
    <div>
      AuthNav
      {/* <NavLink to="/"> */}
      <button className="public-button" onClick={() => props.logOut()}>Logout</button>
      {/* </NavLink> */}
    </div>
  )
}

export default AuthenticatedNav
