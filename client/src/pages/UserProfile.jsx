import React, { useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DeckForm from '../components/CreateDeck'
import {
  // TODO update store types
  SET_CURRENT_USER_DATA,
  DECK_FORM,
  SUBMIT_DECK_FORM,
  GET_DECKS_BY_HANDLE,
  ADD_TO_CURRENT_USER_DECK,
  SELECT_CREATE,
  SET_SELECTED_DECK,
  SET_CURRENT_USER_SELECTED_DECK,
  SET_CURRENT_USER_SELECTED_DECK_IDX
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

const UserProfile = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const { currentUser, currentUserData, appDispatch } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProfile = async () => {
    try {
      console.log('currentUser.handle', currentUser.handle)
      const res = await axios.get(`${BASE_URL}/users/${currentUser.handle}`)

      if (!currentUserData && res.data) {
        appDispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
        appDispatch({ type: SET_SELECTED_DECK, payload: res.data })
        // appDispatch({ type: GET_DECKS_BY_HANDLE, payload: res.data.Decks })
        console.log('getProfile res', res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkFollowing = () => {
    // axios call that returns a boolean
  }

  const renderProfileButton = () => {
    return (
      <div>
        {state.clickedCreate && renderDeckForm()}
        <button
          button className="page-buttons"
          onClick={() =>
            dispatch({ type: SELECT_CREATE, payload: !state.clickedCreate })
          }
        >
          {state.clickedCreate ? `Cancel` : `+ Create Deck`}
        </button>
      </div>
    )
  }

  // map through all of the decks owned by selectedUser
  const renderDecksByHandle = () => {
    return currentUserData.Decks.map((deck, idx) => (
      <div className="cards" key={`${idx}`} onClick={() => targetDeck(deck, idx)}>
        <h3 className="deck-title">{deck.title}</h3>
      </div>
    ))
  }

  //handled on renderDeckByHandle
  // route user to deck page to view deck details
  const targetDeck = (deck, deckIndex) => {
    console.log('deck', deck, deckIndex)
    appDispatch({ type: SET_CURRENT_USER_SELECTED_DECK, payload: deck })
    // appDispatch({
    //   type: SET_CURRENT_USER_SELECTED_DECK_IDX,
    //   payload: deckIndex
    // })
    props.history.push(`/myDeck/${deck.id}`)
  }

  const handleDeckFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/decks/${currentUser.id}`, {
        title: state.deckForm,
        userId: currentUser.id
      })
      console.log('Deck form submitted', res.data)
      dispatch({ type: SUBMIT_DECK_FORM, payload: true })
      appDispatch({
        type: ADD_TO_CURRENT_USER_DECK,
        payload: res.data
      })
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

  useEffect(() => {
    getProfile()
  }, [currentUserData])

  return currentUser && currentUserData ? (
    <div>
      <section className="main-container">
        <h1>Profile: {currentUser.handle}</h1>
        <img
          className="profile-img"
          src={currentUserData.avatarUrl}
          alt={`avatar for ${currentUser.handle}`}
          />
        {renderProfileButton()}
        <div>{renderDecksByHandle()}</div>
        </section>
    </div>
  ) : (
    <h3>No decks yet.</h3>
  )
}

export default UserProfile
