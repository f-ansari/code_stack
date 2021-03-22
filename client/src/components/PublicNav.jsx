import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const PublicNav = (props) => {
  return (
    <div>
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
      <NavLink to="/register">
        <button>Sign Up</button>
      </NavLink>
    </div>
  )
}

export default PublicNav
