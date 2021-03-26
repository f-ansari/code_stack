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
  SELECT_CREATE,
  SET_CURRENT_USER_SELECTED_DECK,
  SET_USER_DECKS,
  SET_CURRENT_USER_DATA
} from '../store/types'
import { BASE_URL } from '../globals'
import axios from 'axios'

const iState = {
  deckForm: '',
  deckFormSubmitted: false,
  clickedCreate: false,
  userDecks: []
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
    case SET_USER_DECKS:
      return { ...iState, userDecks: action.payload }
    default:
      return state
  }
}

const Profile = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const { selectedUser, decksByHandle, appDispatch, currentUserData } = props

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/users/${props.match.params.handle}`
      )
      console.log('profile is called!')
      if (!selectedUser && res.data) {
        appDispatch({ type: SET_SELECTED_USER, payload: res.data })
        appDispatch({ type: GET_DECKS_BY_HANDLE, payload: res.data.Decks })
      } else if (selectedUser && selectedUser.handle !== res.data.handle) {
        appDispatch({ type: SET_SELECTED_USER, payload: res.data })
        appDispatch({ type: GET_DECKS_BY_HANDLE, payload: res.data.Decks })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDecksByHandle = async () => {
    const res = await axios.get(`${BASE_URL}/users/${selectedUser.handle}`)
    dispatch({ type: SET_USER_DECKS, payload: res.data.Decks })
  }

  const renderProfileButton = () => {
    switch (true) {
      case currentUserData && currentUserData.handle === selectedUser.handle:
        return (
          <div>
            {state.clickedCreate}
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
        return <button className="page-buttons">Follow</button>
    }
  }

  const renderDecksByHandle = () => {
    return state.userDecks.map((deck, idx) => (
      <div className="cards" key={`${idx}`} onClick={() => targetDeck(deck)}>
        <h3 className="deck-title">{deck.title}</h3>
      </div>
    ))
  }

  const targetDeck = (deck) => {
    appDispatch({ type: SET_CURRENT_USER_SELECTED_DECK, payload: deck })
    props.history.push(`/deck/${deck.id}`)
  }

  const handleDeckFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/decks/${selectedUser.id}`, {
        title: state.deckForm,
        userId: selectedUser.id
      })
      console.log('Deck form submitted', res.data)
      dispatch({ type: SUBMIT_DECK_FORM, payload: true })
      appDispatch({
        type: GET_DECKS_BY_HANDLE,
        payload: [
          ...decksByHandle,
          {
            id: res.data.id,
            likeCount: res.data.likeCount,
            title: res.data.title
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
    getDecksByHandle()
  }, [selectedUser, decksByHandle])

  return selectedUser ? (
    <div>
      <section className="main-container">
        <h1>@{selectedUser.handle}</h1>
        <div className="user-info">
          <img
            className="profile-img"
            src={selectedUser.avatarUrl}
            alt={`avatar for ${selectedUser.handle}`}
          />
          <br></br>
          {renderProfileButton()}
        </div>

        <br></br>

        <h3>Decks</h3>
        <div>
          {decksByHandle ? renderDecksByHandle() : <h3>No decks yet.</h3>}
        </div>
      </section>
    </div>
  ) : (
    `Loading...`
  )
}

export default Profile
