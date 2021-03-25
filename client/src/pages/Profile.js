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
  SET_USER_DECKS
} from '../store/types'
import { BASE_URL } from '../globals'
import axios from 'axios'

// useReduce handles DeckForm state
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
  const { selectedUser, decksByHandle, appDispatch } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkFollowing = () => {
    // axios call that returns a boolean
  }

  // const renderProfileButton = () => {
  //   switch (true) {
  //     case currentUser && currentUser.handle == selectedUser.handle:
  //       return (
  //         <div>
  //           {state.clickedCreate && renderDeckForm()}
  //           <button
  //             onClick={() =>
  //               dispatch({ type: SELECT_CREATE, payload: !state.clickedCreate })
  //             }
  //           >
  //             {state.clickedCreate ? `Cancel` : `+ Create Deck`}
  //           </button>
  //         </div>
  //       )

  //     default:
  //       return <button>Follow</button>
  //   }
  // }

  // map through all of the decks owned by selectedUser
  const renderDecksByHandle = () => {
    return state.userDecks.map((deck, idx) => (
      <div key={`${idx}`} onClick={() => targetDeck(deck)}>
        <h3>Deck Title: {deck.title}</h3>
      </div>
    ))
  }

  //handled on renderDeckByHandle
  // route user to deck page to view deck details
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

  // const renderDeckForm = () => {
  //   return (
  //     <form onSubmit={(event) => handleDeckFormSubmit(event)}>
  //       <input
  //         name="deckForm"
  //         placeholder="Create a new deck"
  //         type="text"
  //         value={state.deckForm}
  //         onChange={(event) =>
  //           dispatch({ type: DECK_FORM, payload: event.target.value })
  //         }
  //       />

  //       <input type="submit" value="Submit" />
  //     </form>
  //   )
  // }

  useEffect(() => {
    getProfile()
    getDecksByHandle()
  }, [selectedUser, decksByHandle])

  return selectedUser ? (
    <div>
      <h1>Profile: {selectedUser.handle} </h1>

      <img
        src={selectedUser.avatarUrl}
        alt={`avatar for ${selectedUser.handle}`}
      />
      <div>
        {decksByHandle ? renderDecksByHandle() : <h3>No decks yet.</h3>}
      </div>
    </div>
  ) : (
    `Loading...`
  )
}

export default Profile
