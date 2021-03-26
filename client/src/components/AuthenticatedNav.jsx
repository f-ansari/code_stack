import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
const AuthenticatedNav = (props) => {
  const myProfile = props.currentUser.handle
  const history = useHistory()
  return (
    <div>
      <NavLink to="/">
        <button className="nav-buttons">HOME</button>
      </NavLink>
      <NavLink to="/userlist">
        <button className="nav-buttons">All Users</button>
      </NavLink>
      <button
        className="nav-buttons"
        onClick={() => history.push(`/user/${myProfile}`)}
      >
        myProfile
      </button>
      <button className="nav-buttons" onClick={() => props.logOut()}>
        Logout
      </button>
    </div>
  )
}
export default AuthenticatedNav