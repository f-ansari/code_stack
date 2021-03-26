import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  SET_SELECTED_FLASHCARD,
  SET_SELECTED_DECK,
  GET_DECKS_BY_HANDLE,
  SET_CURRENT_USER_SELECTED_DECK,
  SET_SELECTED_USER
} from '../store/types'

const FriendDeck = (props) => {
  console.log(props)
  const { selectedUser, selectedDeck, decksByHandle, currentUserSelectedDeck } = props

  const [deckTitle, setTitle] = useState(selectedDeck.title)
  const [flashcards, setFlashcards] = useState([])
  const [storedDecksByHandle, setDecksByHandle] = useState(decksByHandle)
  const [storedSelectedUser, setSelectedUser] = useState(selectedUser)

  const history = useHistory()

  // FUNCTIONS TO HANDLE FLASHCARD SELECTION

  const handleFlashcardClick = (id) => {
    setFlashcardState(id)
    redirectToFlashcardPage(id)
  }

  const redirectToFlashcardPage = (id) => {
    history.push(`/flashcard/${id}`)
  }

  const setFlashcardState = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/flashcards/${id}`)
      props.dispatch({ type: SET_SELECTED_FLASHCARD, payload: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  //AXIOS CALL TO POPULATE FLASHCARDS BY DECK

  const getFlashcardsByDeck = async () => {
    console.log('props.selectedDeck.id:', props.selectedDeck.id)
    try {
      const response = await axios.get(
        `${BASE_URL}/flashcards/deck/${selectedDeck.id}`
      )
      console.log('res for getFlashcardsByDeck', response.data)
      setFlashcards(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //UPDATE LIKES

  const updateLikes = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/decks/likes/${selectedDeck.id}`)

      console.log(res.data)
      props.dispatch({ type: SET_SELECTED_DECK, payload: res.data[1][0] })
    } catch (error) {
      console.log(error)
    }
  }

  //USE EFFECT

  useEffect(() => {
    getFlashcardsByDeck()
    setDecksByHandle(storedDecksByHandle)
    setSelectedUser(storedSelectedUser)
  }, [])
  console.log(flashcards)
  return (
    <div className="main-container">
      <h1>Profile: {selectedUser ? selectedUser.handle : null}</h1>

      <img
       className="profile-img"
        src={selectedUser ? selectedUser.avatarUrl : null}
        alt={`avatar for ${selectedUser ? selectedUser.handle : null}`}
      />
      <h3>{deckTitle}</h3>
      <p>
        <button className="page-buttons" onClick={updateLikes}>👍</button>
        {selectedDeck.likeCount}
      </p>
      {flashcards.length ? (
        flashcards.map((flashcard, idx) => (
          <div className="cards" key={`${idx}`} onClick={() => handleFlashcardClick(flashcard.id)}>
            <h3 className="deck-title">{flashcard.title}</h3>
          </div>
        ))
      ) : (
        <div>Hmm... It looks like {selectedUser ? `@${selectedUser.handle}` : 'this user'} is still working on making some great flashcards for this deck.</div>
      )}
    </div>
  )
}

export default FriendDeck
