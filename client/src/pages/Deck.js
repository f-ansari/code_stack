import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { BASE_URL } from '../globals'
import axios from 'axios'

const Deck = (props) => {
  let likeCount = 10
  let selectedUser = { handle: 'luke', avatarUrl: 'url' }
  let currentUser = { handle: 'luke' }
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

  // ^^^ SHOULD BE PASSED IN AS PROPS, HARD CODED FOR DEMO

  const [isEditing, setEditing] = useState(false)
  const [deckTitle, setTitle] = useState('')
  const [flashcards, setFlashcards] = useState([])

  const history = useHistory()

  const redirectToFlashcardPage = (id) => {
    history.push(`/flashcard/${id}`)
  }

  const toggleEdit = () => {
    setEditing(!isEditing)
  }

  const submitUpdate = async () => {
    await axios.put(`${BASE_URL}/decks/${props.match.params.deckId}`, {
      title: deckTitle
    })
    toggleEdit()
  }

  const getFlashcardsByDeck = async () => {
    const response = await axios.get(`${BASE_URL}/flashcards/deck/2`)
    console.log(response)
    setFlashcards(response.data)
  }

  const updateTitleState = (e) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    getFlashcardsByDeck()
  })

  return (
    <div>
      <h1>Profile: {selectedUser ? selectedUser.handle : null}</h1>
      {renderProfileButton()}
      <img
        src={selectedUser ? selectedUser.avatarUrl : null}
        alt={`avatar for ${selectedUser ? selectedUser.handle : null}`}
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
          <div onClick={() => redirectToFlashcardPage(flashcard.id)}>
            <h3>{flashcard.title}</h3>
          </div>
        ))
      ) : (
        <div>You don't have any decks yet!</div>
      )}
    </div>
  )
}

export default Deck
