import React, { useReducer } from 'react'
import { NavLink } from 'react-router-dom'
import {
  // TODO add these types of store
  SIGNUP_FORM,
  SUBMIT_SIGNUP
} from '../store/types'
import { BASE_URL } from '../globals'
import axios from 'axios'

// TODO:  add props.currentUser to PubNav component so that handle can be pre-filled in when user is routed to login post-register

const iState = {
  register: {
    firstname: '',
    handle: '',
    email: '',
    avatar:
      'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png',
    password: ''
  },
  signupSubmitted: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case SIGNUP_FORM:
      return {
        ...state,
        register: {
          ...state.register,
          [action.payload.name]: action.payload.value
        }
      }
    case SUBMIT_SIGNUP:
      return { ...iState, signupSubmitted: action.payload }
    default:
      return state
  }
}

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, iState)

  const handleChange = (event) => {
    dispatch({
      type: SIGNUP_FORM,
      payload: { name: event.target.name, value: event.target.value }
    })
  }

  const handleSubmit = async (e) => {
    try {
      await axios.post(`${BASE_URL}/auth/register`, state.register)
      dispatch({ type: SUBMIT_SIGNUP, payload: true })
      // history.push('/login') // ! should we route user to login page once register form is submitted. Confirmation Message?
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {state.signupSubmitted ? (
        <div>
          <h1>SignUp</h1>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              name="firstname"
              placeholder="First Name"
              type="text"
              value={state.firstname}
              onChange={(event) => handleChange(event)}
            />
            <input
              name="handle"
              placeholder="handle"
              type="text"
              value={state.handle}
              onChange={(event) => handleChange(event)}
            />
            <input
              name="email"
              placeholder="email@me.com"
              type="text"
              value={state.email}
              onChange={(event) => handleChange(event)}
            />
            <input
              name="password"
              placeholder="password"
              type="text"
              value={state.password}
              onChange={(event) => handleChange(event)}
            />
            <input
              name="avatar"
              placeholder="Add an image URL to use for your profile"
              type="avatar"
              value={state.avatar}
              onChange={(event) => handleChange(event)}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : (
        <div>
          <h2>Nice! Your account was created.</h2>
          <NavLink to="/login">
            <button>Sign in</button>
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default SignUp
