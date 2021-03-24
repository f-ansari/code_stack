import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { SET_SELECTED_FLASHCARD } from '../store/types'
import CreateFlashcard from '../components/CreateFlashcard'

const Deck = (props) => {
  let likeCount = 10
  let currentUser = { handle: 'luke' }
  const selectedUser = { handle: 'luke', avatarUrl: 'url' }
  const renderProfileButton = () => {
    switch (true) {
      case currentUser && currentUser.handle === selectedUser.handle:
        return (
          <button onClick={() => setCreateFlashcard(true)}>
            + Create Flashcard
          </button>
        )
      // case currentUser &&
      //   currentUser.handle !== selectedUser.handle &&
      //   checkFollowing() === false:
      //   return <button>+ Create Deck</button>
      default:
        return <button>Follow</button>
    }
  }

  // const { selectedUser, selectedDeck } = props

  const [isEditing, setEditing] = useState(false)
  const [createFlashcard, setCreateFlashcard] = useState(false)
  const [deckTitle, setTitle] = useState('')
  const [flashcards, setFlashcards] = useState([])

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
    const res = await axios.get(`${BASE_URL}/flashcards/${id}`)
    props.dispatch({ type: SET_SELECTED_FLASHCARD, payload: res.data })
  }

  //AXIOS CALL TO POPULATE FLASHCARDS BY DECK

  const getFlashcardsByDeck = async () => {
    const response = await axios.get(
      `${BASE_URL}/flashcards/deck/${props.selectedDeck}`
    )
    setFlashcards(response.data)
  }

  //FUNCTIONS TO UPDATE DECK TITLE

  const toggleEdit = () => {
    setEditing(!isEditing)
  }

  const submitUpdate = async () => {
    await axios.put(`${BASE_URL}/decks/${props.match.params.deckId}`, {
      title: deckTitle
    })
    toggleEdit()
  }

  const updateTitleState = (e) => {
    setTitle(e.target.value)
  }

  //USE EFFECT

  useEffect(() => {
    getFlashcardsByDeck()
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
            <form onSubmit={submitUpdate}>
              <input
                type="text"
                placeholder="Enter a new title"
                onChange={(e) => updateTitleState(e)}
              />
              <input type="submit" value="Submit" />
            </form>
          ) : (
            <div>
              <h1>Deck</h1>
              <button onClick={toggleEdit}>Edit</button>
            </div>
          )}

          <p>Likes: {likeCount}</p>
          {flashcards.length ? (
            flashcards.map((flashcard) => (
              <div onClick={() => handleFlashcardClick(flashcard.id)}>
                <h3>{flashcard.title}</h3>
              </div>
            ))
          ) : (
            <div>You don't have any flashcards in this deck yet!</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Deck
