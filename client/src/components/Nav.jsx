import React from 'react'

import AuthenticatedNav from './AuthenticatedNav'
import PublicNav from './PublicNav'

const Nav = (props) => {
  console.log(props)
  return props.authenticated ? (
    <AuthenticatedNav logOut={props.logOut} currentUser={props.currentUser} />
  ) : (
    <PublicNav />
  )
}

export default Nav
