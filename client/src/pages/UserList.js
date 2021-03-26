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
      <section className="main-container">
        <h1>Welcome to the Jungle</h1>
        <h2>Go ahead and find a user</h2>
        {users.map((user) => (
          <div className="cards" onClick={() => targetUser(user)}>
            <h3 className="deck-title">{user.handle}</h3>
          </div>
        ))}
      </section>
    </div>
  )
}

export default UserList
