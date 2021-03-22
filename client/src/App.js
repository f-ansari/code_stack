import React, { useReducer, useEffect } from 'react'
import { Route, useHistory, Switch } from 'react-router'
import Nav from './components/Nav'
import Profile from './pages/Profile'
import Deck from './pages/Deck'
import HomePage from './pages/HomePage'
import Flashcard from './pages/Flashcard'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'

import {
  SET_AUTHENTICATED,
  SET_SELECTED_USER,
  SET_SELECTED_DECK,
  GET_DECKS_BY_HANDLE,
  GET_FRIENDS_DECKS,
  GET_ALL_DECKS,
  SET_CURRENT_USER
} from './store/types'
import './App.css'
import { Router } from 'express'

const iState = {
  authenticated: false,
  allDecks: '',
  selectedUser: '',
  selectedDeck: [],
  decksByHandle: [],
  allFriendsDecks: [],
  currentUser: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: action.payload }
    case SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload }
    case SET_SELECTED_DECK:
      return { ...state, selectedDeck: action.payload }
    case GET_DECKS_BY_HANDLE:
      return { ...state, decksByHandle: action.payload }
    case GET_FRIENDS_DECKS:
      return { ...state, allFriendsDecks: action.payload }
    case GET_ALL_DECKS:
      return { ...state, allDecks: action.payload }
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, iState)
  const history = useHistory()
  const checkStoredToken = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      // const res = await axios.get(`${BASE_URL}/auth/session`) for us to keep
      // dispatch({ type: SET_CURRENT_USER, payload: res.data }) for us to keep
      // setUser(res.data) delete later
      dispatch({ type: SET_AUTHENTICATED, payload: true })
      // history.push('/feed') //route to profile
    }
  }

  const logOut = () => {
    console.log('clicked logout!')
    localStorage.clear()
    dispatch({ type: SET_AUTHENTICATED, payload: false })
    dispatch({ type: SET_CURRENT_USER, payload: null })
    history.push('/')
  }

  useEffect(() => {
    checkStoredToken()
  }, [state.authenticated])

  return (
    <div className="App">
      <Nav
        authenticated={state.authenticated}
        currentUser={state.currentUser}
        logOut={logOut}
      />

      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <HomePage {...props} />}
          />
          <Route
            path="/user/:userhandle"
            component={(props) => <Profile {...props} />}
          />
          <Route
            path="/deck/:deckId"
            component={(props) => <Deck {...props} />}
          />
          <Route
            path="/flashcard/:flashcardId"
            component={(props) => <Flashcard {...props} />}
          />
          <Route
            path="/login"
            component={(props) => <LoginForm {...props} />}
          />
          <Route
            path="/register"
            component={(props) => <SignUp {...props} />}
          />
        </Switch>
      </main>
    </div>
  )
}

export default App
