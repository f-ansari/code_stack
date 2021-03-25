import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  SET_SELECTED_FLASHCARD,
  SET_SELECTED_DECK,
  GET_DECKS_BY_HANDLE
} from '../store/types'
import CreateFlashcard from '../components/CreateFlashcard'

const Deck = (props) => {
  const { selectedUser, selectedDeck, decksByHandle, currentUser } = props

  const [isEditing, setEditing] = useState(false)
  const [createFlashcard, setCreateFlashcard] = useState(false)
  const [deckTitle, setTitle] = useState(selectedDeck.title)
  const [flashcards, setFlashcards] = useState([])
  const [storedDecksByHandle, setDecksByHandle] = useState(decksByHandle)
  const [storedSelectedUser, setSelectedUser] = useState(selectedUser)

  const history = useHistory()

  // RENDER BUTTONS CONDITIONALLY

  const renderProfileButton = () => {
    switch (true) {
      case currentUser && currentUser.handle === selectedUser.handle:
        console.log('code is reachable')
        return (
          <div>
            <button onClick={() => setCreateFlashcard(true)}>
              + Create Flashcard
            </button>
          </div>
        )
      default:
        return <button>Follow</button>
    }
  }

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
    try {
      const response = await axios.get(
        `${BASE_URL}/flashcards/deck/${props.selectedDeck.id}`
      )
      setFlashcards(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //FUNCTIONS TO UPDATE DECK TITLE

  const toggleEdit = () => {
    setEditing(!isEditing)
  }

  const submitUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${BASE_URL}/decks/${props.match.params.deckId}`, {
        title: deckTitle
      })
      props.dispatch({
        type: SET_SELECTED_DECK,
        payload: { ...selectedDeck, title: deckTitle }
      })
      props.dispatch({
        type: GET_DECKS_BY_HANDLE,
        payload: { ...storedDecksByHandle }
      })
      toggleEdit()
    } catch (error) {
      console.log(error)
    }
  }

  const updateTitleState = (e) => {
    setTitle(e.target.value)
  }

  //USE EFFECT

  useEffect(() => {
    getFlashcardsByDeck()
    setDecksByHandle(storedDecksByHandle)
    setSelectedUser(storedSelectedUser)
  }, [])

  return (
    <div>
      {createFlashcard ? (
        <div>
          <CreateFlashcard selectedDeck={props.selectedDeck} />
        </div>
      ) : (
        <div>
          <h1>Profile: {selectedUser ? selectedUser.handle : null}</h1>
          {renderProfileButton()}
          <img
            src={selectedUser ? selectedUser.avatarUrl : null}
            alt={`avatar for ${
              selectedUser ? selectedUser.handle : 'undefined'
            }`}
          />
          {isEditing ? (
            <form onSubmit={(e) => submitUpdate(e)}>
              <input
                type="text"
                placeholder="Enter a new title"
                onChange={(e) => updateTitleState(e)}
              />
              <input type="submit" value="Submit" />
              <button onClick={toggleEdit}>Cancel</button>
            </form>
          ) : (
            <div>
              <h1>{deckTitle}</h1>
              <button onClick={toggleEdit}>Edit</button>
              <button>
                <a href={`/user/${selectedUser.handle}`}>Return to profile</a>
              </button>
            </div>
          )}

          <p>Likes: {selectedDeck.likeCount}</p>
          {flashcards.length ? (
            flashcards.map((flashcard) => (
              <div onClick={() => handleFlashcardClick(flashcard.id)}>
                <h3>{flashcard.title}</h3>
              </div>
            ))
          ) : (
            <div>There aren't any flashcards in this deck yet!</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Deck
