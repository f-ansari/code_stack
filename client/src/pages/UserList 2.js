import axios from 'axios'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import { SET_CURRENT_USER } from '../store/types'

const UserList = (props) => {
  const [users, setUsers] = useState({})
  const getAllUsers = async () => {
    const res = await axios.get(`${BASE_URL}/users`)
    setUsers(res.data)
  }

  const mapUsers = () => {
    users.map((user) => (
      <div onClick={() => targetUser(user)}>
        <h3>{user.handle}</h3>
      </div>
    ))
  }

  const targetUser = (user) => {
    props.dispatch({ type: SET_CURRENT_USER, payload: user })
    props.history.push(`/user/${user.handle}`)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <h2>Find Users:</h2>
      {mapUsers()}
    </div>
  )
}

export default UserList
