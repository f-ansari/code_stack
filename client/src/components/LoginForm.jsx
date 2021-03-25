import React, { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import {
  LOGIN_FORM,
  RESET_LOGIN,
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_SELECTED_USER
} from '../store/types'
import axios from 'axios'
import { BASE_URL } from '../globals'

const iState = {
  login: {
    handle: ' ',
    password: ' '
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_FORM:
      return {
        ...state,
        login: { ...state.login, [action.payload.name]: action.payload.value }
      }
    case RESET_LOGIN:
      return { ...iState }
    default:
      return state
  }
}

const LoginForm = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const history = useHistory()

  const submitLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, state.login)
      localStorage.setItem('token', res.data.token)
      dispatch({ type: RESET_LOGIN })
      props.appDispatch({ type: SET_CURRENT_USER, payload: res.data.user })
      props.appDispatch({ type: SET_SELECTED_USER, payload: res.data.user })
      props.appDispatch({ type: SET_AUTHENTICATED, payload: true })
      history.push(`/user/${res.data.user.handle}`)
    } catch (err) {
      console.log('Error: loginForm in submitLogin()')
    }
  }

  const handleLoginChange = (e) => {
    dispatch({
      type: LOGIN_FORM,
      payload: { name: e.target.name, value: e.target.value }
    })
  }

  return (
    <div>
      <h1>Login Form</h1>

      <form onSubmit={(e) => submitLogin(e)}>
        <input
          type="text"
          name="handle"
          value={state.handle}
          onChange={(e) => handleLoginChange(e)}
          placeholder="jane_doe"
        />
        <input
          type="text"
          name="password"
          value={state.password}
          onChange={(e) => handleLoginChange(e)}
          placeholder="jane_doe"
        />
        <button color="black" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default LoginForm

//test
