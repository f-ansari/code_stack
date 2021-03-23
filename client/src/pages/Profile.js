import React, { useReducer, useEffect } from 'react'
import DeckForm from '../components/CreateDeck'
import {
  // TODO update store types
  SET_SELECTED_DECK,
  SET_SELECTED_USER,
  DECK_FORM,
  SUBMIT_DECK_FORM
} from '../store/types'
// import { BASE_URL } from '../globals'
// import axios from 'axios'

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
    dispatch
  } = props

  const getProfile = async () => {
    // fetch profile from db using selectedUser.id or selectedUser.handle??
    // TODO: to fetch decks with user, we would need to update the getProfile controller
    try {
      //const res = await axios.get(`${BASE_URL}/${props.match.params.handle}`)
      // dispatch({ type: SET_SELECTED_USER, payload: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  const checkFollowing = () => {
    // axios call that returns a boolean
  }

  const renderProfileButton = () => {
    // SWITCH statement
    // render createDeck btn if selectedUser matches currentUser
    // render follow btn if selectedUser does not match currentUser & checkFollowing is false
    // render unfollow btn is selectedUser does not match currentUser & checkFollowing is true
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
    dispatch({ type: SET_SELECTED_DECK, payload: deckId })
    props.params.history.push(`/deck/${deckId}`)
  }

  // fill profile will props.match.params.handle on mount
  useEffect(() => {
    getProfile()
  }, [props.match.params.handle])

  return (
    <div>
      <h1>Profile: {selectedUser ? selectedUser.handle : null}</h1>
      {renderProfileButton}
      <img
        src={selectedUser ? selectedUser.avatarUrl : null}
        alt={`avatar for ${selectedUser ? selectedUser.handle : null}`}
      />
      <div>{renderDecksByHandle}</div>
    </div>
  )
}

export default Profile
