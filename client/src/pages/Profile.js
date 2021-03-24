import React, { useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DeckForm from '../components/CreateDeck'
import {
  // TODO update store types
  SET_SELECTED_DECK,
  SET_SELECTED_USER,
  DECK_FORM,
  SUBMIT_DECK_FORM,
  GET_DECKS_BY_HANDLE,
  SELECT_CREATE
} from '../store/types'
import { BASE_URL } from '../globals'
import axios from 'axios'

// useReduce handles DeckForm state
const iState = {
  deckForm: '',
  deckFormSubmitted: false,
  clickedCreate: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case DECK_FORM:
      return {
        ...state,
        deckForm: action.payload
      }
    case SUBMIT_DECK_FORM:
      return { ...iState, deckFormSubmitted: action.payload }
    case SELECT_CREATE:
      return { ...iState, clickedCreate: action.payload }
    default:
      return state
  }
}

const Profile = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const { currentUser, selectedUser, decksByHandle, appDispatch } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/users/${props.match.params.handle}`
      )
      console.log(res)
      if (!selectedUser && res.data) {
        appDispatch({ type: SET_SELECTED_USER, payload: res.data })
        appDispatch({ type: GET_DECKS_BY_HANDLE, payload: res.data.Decks })
      } else if (selectedUser && selectedUser.handle !== res.data.handle) {
        appDispatch({ type: SET_SELECTED_USER, payload: res.data })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkFollowing = () => {
    // axios call that returns a boolean
  }

  const renderProfileButton = () => {
    switch (true) {
      case currentUser && currentUser.handle !== selectedUser.handle:
        return (
          <div>
            {state.clickedCreate && renderDeckForm()}
            <button
              onClick={() =>
                dispatch({ type: SELECT_CREATE, payload: !state.clickedCreate })
              }
            >
              {state.clickedCreate ? `Cancel` : `+ Create Deck`}
            </button>
          </div>
        )

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

  //handled on renderDeckByHandle
  // route user to deck page to view deck details
  const targetDeck = (deckId) => {
    appDispatch({ type: SET_SELECTED_DECK, payload: deckId })
    props.history.push(`/deck/${deckId}`)
  }

  const handleDeckFormSubmit = async (e) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/decks/${state.currentUser.id}`,
        state.deckForm
      )
      console.log(res)
      dispatch({ type: SUBMIT_DECK_FORM, payload: true })
    } catch (error) {
      console.log(error)
    }
  }

  const renderDeckForm = () => {
    return (
      <form onSubmit={(event) => handleDeckFormSubmit(event)}>
        <input
          name="deckForm"
          placeholder="Create a new deck"
          type="text"
          value={state.deckForm}
          onChange={(event) =>
            dispatch({ type: DECK_FORM, payload: event.target.value })
          }
        />

        <input type="submit" value="Submit" />
      </form>
    )
  }

  // console.log(selectedUser)

  // fill profile will props.match.params.handle on mount
  useEffect(() => {
    getProfile()
  }, [selectedUser, getProfile])

  return (
    <div>
      <h1>Profile: {selectedUser ? selectedUser.handle : `Loading...`}</h1>
      {selectedUser ? renderProfileButton() : null}
      <img
        src={selectedUser ? selectedUser.avatarUrl : null}
        alt={`avatar for ${selectedUser ? selectedUser.handle : null}`}
      />
      <div>
        {decksByHandle.length > 0 ? (
          renderDecksByHandle()
        ) : (
          <h3>No decks yet.</h3>
        )}
      </div>
    </div>
  )
}

export default Profile
