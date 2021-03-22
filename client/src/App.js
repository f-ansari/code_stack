import React, { useReducer, useEffect } from 'react'
import { SET_DECKS } from './store/types'
import './App.css'

const iState = {
  authenticated: '',
  allDecks: '',
  selectedUser: '',
  selectedDeck: '',
  decksByHandle: '',
  allFriendsDecks: '',
  currentUser: ''
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

  return (
    <div className="App">
      <header className="App-header">
        Hello Project 3 Team!
        <br />
        Let's get Hacking
      </header>
    </div>
  )
}

export default App
