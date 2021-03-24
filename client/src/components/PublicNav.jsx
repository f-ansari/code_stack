import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const PublicNav = () => {
  return (
    <div>
      <NavLink to="/login">
        <button className="public-button">Login</button>
      </NavLink>
      <NavLink to="/register">
        <button className="public-button">Sign Up</button>
      </NavLink>
    </div>
  )
}

export default PublicNav
