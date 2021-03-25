import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const PublicNav = () => {
  return (
    <div>
      <NavLink to="/">
        <button className="nav-buttons">HOME</button>
      </NavLink>
      <NavLink to="/login">
        <button className="nav-buttons">Login</button>
      </NavLink>
      <NavLink to="/register">
        <button className="nav-buttons">Sign Up</button>
      </NavLink>
    </div>
  )
}

export default PublicNav
