import React, { useReducer, useEffect } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Profile from './pages/Profile'

import UserProfile from './pages/UserProfile'
import Deck from './pages/Deck'
import HomePage from './pages/HomePage'
import Flashcard from './pages/Flashcard'
import CreateFlashcard from './components/CreateFlashcard'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import axios from 'axios'
import { BASE_URL } from './globals'

import {
  SET_AUTHENTICATED,
  SET_SELECTED_USER,
  SET_SELECTED_DECK,
  SET_SELECTED_FLASHCARD,
  GET_DECKS_BY_HANDLE,
  GET_FRIENDS_DECKS,
  SET_CURRENT_USER_DATA,
  SET_CURRENT_USER_FLASHCARD,
  GET_ALL_DECKS,
  SET_CURRENT_USER,
  ADD_TO_CURRENT_USER_DECK,
  SET_CURRENT_USER_SELECTED_DECK
} from './store/types'
import './style/App.css'

const iState = {
  authenticated: false,
  //allDecks: '',
  selectedUser: null,
  selectedDeck: [],
  selectedFlashcard: [],
  decksByHandle: [],
  allUsers: [],
  currentUser: {},
  currentUserData: null,
  currentUserSelectedDeck: [],
  currentUserFlashcard: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: action.payload }
    case SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload }
    case SET_SELECTED_DECK:
      return { ...state, selectedDeck: action.payload }
    case SET_SELECTED_FLASHCARD:
      return { ...state, selectedFlashcard: action.payload }
    case GET_DECKS_BY_HANDLE:
      return { ...state, decksByHandle: action.payload }
    case GET_FRIENDS_DECKS:
      return { ...state, allFriendsDecks: action.payload }
    case GET_ALL_DECKS:
      return { ...state, allDecks: action.payload }
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    case SET_CURRENT_USER_DATA:
      return { ...state, currentUserData: action.payload }
    case SET_CURRENT_USER_FLASHCARD:
      return { ...state, currentUserFlashcard: action.payload }
    case SET_CURRENT_USER_SELECTED_DECK:
      return { ...state, currentUserSelectedDeck: action.payload }
    case ADD_TO_CURRENT_USER_DECK:
      return {
        ...state,
        currentUserData: {
          ...state.currentUserData,
          Decks: [...state.currentUserData.Decks, action.payload]
        }
      }
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
      const res = await axios.get(`${BASE_URL}/auth/session`)
      dispatch({ type: SET_CURRENT_USER, payload: res.data })
      dispatch({ type: SET_AUTHENTICATED, payload: true })
      history.push(`/user/${state.currentUser.handle}`)
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
    // eslint-disable-next-line
  }, [state.authenticated])

  return (
    <div className="App">
      <header className="nav-bar">
        <Nav
          authenticated={state.authenticated}
          currentUser={state.currentUser}
          logOut={logOut}
        />
      </header>

      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <HomePage {...props} dispatch={dispatch} />}
          />
          <Route
            path="/selected/:handle"
            component={(props) => (
              <Profile
                {...props}
                currentUser={state.currentUser}
                selectedUser={state.selectedUser}
                selectedDeck={state.selectedDeck}
                decksByHandle={state.decksByHandle}
                appDispatch={dispatch}
              />
            )}
          />
          <Route
            path="/user/:handle"
            component={(props) => (
              <UserProfile
                {...props}
                currentUser={state.currentUser}
                currentUserData={state.currentUserData}
                decksByHandle={state.decksByHandle}
                appDispatch={dispatch}
              />
            )}
          />
          <Route
            path="/deck/:deckId"
            component={(props) => (
              <Deck
                {...props}
                dispatch={dispatch}
                selectedDeck={state.selectedDeck}
                selectedUser={state.selectedUser}
                currentUser={state.currentUser}
                decksByHandle={state.decksByHandle}
                currentUserSelectedDeck={state.currentUserSelectedDeck}
              />
            )}
          />
          <Route
            exact
            path="/flashcard/:flashcardId"
            component={(props) => (
              <Flashcard
                {...props}
                selectedUser={state.selectedUser}
                selectedFlashcard={state.selectedFlashcard}
                currentUser={state.currentUser}
                selectedDeck={state.selectedDeck}
                currentUserSelectedDeck={state.currentUserSelectedDeck}
              />
            )}
          />
          <Route
            path="/flashcard"
            component={(props) => (
              <CreateFlashcard
                {...props}
                currentUser={state.currentUser}
                selectedUser={state.selectedUser}
                selectedFlashcard={state.selectedFlashcard}
                currentUserSelectedDeck={state.currentUserSelectedDeck}
              />
            )}
          />
          <Route
            path="/login"
            component={(props) => (
              <LoginForm
                {...props}
                currentUser={state.currentUser}
                authenticated={state.authenticated}
                appDispatch={dispatch}
              />
            )}
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
