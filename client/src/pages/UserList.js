import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import { SET_SELECTED_USER } from '../store/types'

const UserList = (props) => {
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    const res = await axios.get(`${BASE_URL}/users`)
    console.log(res.data)
    setUsers(res.data)
  }

  const targetUser = (user) => {
    props.dispatch({ type: SET_SELECTED_USER, payload: user })
    props.history.push(`/selected/${user.handle}`)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <h2>Find Users:</h2>
      {users.map((user) => (
        <div onClick={() => targetUser(user)}>
          <h3>{user.handle}</h3>
        </div>
      ))}
    </div>
  )
}

export default UserList
