import React, { useReducer, useEffect } from 'react'
// import DeckForm from '../components/CreateDeck'
import {
  // TODO update store types
  SET_SELECTED_DECK,
  SET_SELECTED_USER,
  DECK_FORM,
  SUBMIT_DECK_FORM,
  GET_DECKS_BY_HANDLE
} from '../store/types'
import { BASE_URL } from '../globals'
import axios from 'axios'

// useReduce handles DeckForm state
const iState = {
  deckForm: '',
  deckFormSubmitted: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case DECK_FORM:
      return {
        ...state,
        register: {
          ...state.register,
          [action.payload.name]: action.payload.value
        }
      }
    case SUBMIT_DECK_FORM:
      return { ...iState, deckSubmitted: action.payload }
    default:
      return state
  }
}

const Profile = (props) => {
  const [state, action] = useReducer(iState, reducer)
  const {
    currentUser,
    selectedUser,
    selectedDeck,
    decksByHandle,
    appDispatch
  } = props

  const getProfile = async () => {
    // fetch profile from db using selectedUser.id or selectedUser.handle??
    // TODO: to fetch decks with user, we would need to update the getProfile controller
    try {
      const res = await axios.get(
        `${BASE_URL}/users/${props.match.params.handle}`
      )
      console.log(res)
      if (!selectedUser && res.data[0]) {
        appDispatch({ type: SET_SELECTED_USER, payload: res.data[0] })
      } else if (selectedUser && selectedUser.handle !== res.data[0].handle) {
        appDispatch({ type: SET_SELECTED_USER, payload: res.data[0] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDecksByHandle = async () => {
    // get decks by handle
    try {
      // const res = await axios.get(`${BASE_URL}/users/${/*controller for getDecksByHandle*/}`)
      // appDispatch({ type: GET_DECKS_BY_HANDLE, payload: res.data })
    } catch (error) {
      throw error
    }
  }

  const checkFollowing = () => {
    // axios call that returns a boolean
  }

  const renderProfileButton = () => {
    switch (true) {
      case currentUser && currentUser.handle === selectedUser.handle:
        return <button>+ Create Deck</button>
      // case currentUser &&
      //   currentUser.handle !== selectedUser.handle &&
      //   checkFollowing() === false:
      //   return <button>+ Create Deck</button>
      default:
        return <button>Follow</button>
    }
  }

  // map through all of the decks owned by selectedUser
  const renderDecksByHandle = () => {
    return decksByHandle.map((deck, idx) => (
      <div key={`${idx}`} onClick={() => targetDeck(deck.id)}>
        <h3>Deck Title: {deck.title}</h3>
      </div>
    ))
  }

  // route user to deck page to view deck details
  const targetDeck = (deckId) => {
    appDispatch({ type: SET_SELECTED_DECK, payload: deckId })
    props.history.push(`/deck/${deckId}`)
  }

  // fill profile will props.match.params.handle on mount
  useEffect(() => {
    getProfile()
  }, [selectedUser, getProfile])

  return (
    <div>
      {selectedUser ? (
        <div>
          <h1>Profile: {selectedUser.handle}</h1>
          <img
            src={selectedUser.avatarUrl}
            alt={`avatar for ${selectedUser.handle}`}
          />
        </div>
      ) : (
        <div>
          <h1>Profile Not Found</h1>
        </div>
      )}
    </div>
  )
}

export default Profile
