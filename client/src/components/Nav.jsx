import React from 'react'

import AuthenticatedNav from './AuthenticatedNav'
import PublicNav from './PublicNav'

const Nav = (props) => {
  return props.authenticated ? (
    <AuthenticatedNav logout={props.logout} currentUser={props.currentUser} />
  ) : (
    <PublicNav />
  )
}

export default Nav