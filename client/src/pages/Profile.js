import React, { useState, useEffect } from 'react'
import DeckForm from '../components/CreateDeck'
import { SET_SELECTED_DECK, SET_SELECTED_USER } from '../store/types'
// import { BASE_URL } from '../globals'
// import axios from 'axios'

const Profile = (props) => {
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

  const switchButton = () => {
    // SWITCH statement
    // render createDeck btn if selectedUser matches currentUser
    // render follow btn if selectedUser does not match currentUser & checkFollowing is false
    // render unfollow btn is selectedUser does not match currentUser & checkFollowing is true
    switch (true) {
      case currentUser && currentUser.handle:
        return <button>+ Create Deck</button>
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

  useEffect(() => {
    getProfile()
  }, [props.match.params.handle])

  return (
    <div>
      <h1>Profile: {selectedUser ? selectedUser.handle : null}</h1>
      {switchButton}
      <img
        src={currentUser ? currentUser.avatarUrl : null}
        alt={`avatar for ${currentUser ? currentUser.handle : null}`}
      />
      <div>{renderDecksByHandle}</div>
    </div>
  )
}

export default Profile
