import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Deck = (props) => {
  let flashcards = [
    { title: 'Classes', id: 1 },
    { title: 'Functions', id: 2 },
    { title: 'HOF', id: 3 }
  ]
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

  // FARYAL'S SANDBOX AREA STARTS

  console.log('1st props', props)

  //this is suppose to get the flashcards by deckId, however it is not working
  //in insomnia...sorry i intruded :)
  const getFlashcardsByUsersDeck = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/decks/view/${props.match.params.deckId}`
      )
      console.log('axios res', res)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getFlashcardsByUsersDeck()
  })

  // FARYAL'S SANDBOX AREA ENDS

  const [isEditing, setEditing] = useState(false)
  const [deckTitle, setTitle] = useState('')

  const history = useHistory()

  const redirectToFlashcardPage = (id) => {
    history.push(`/flashcard/${id}`)
  }

  const toggleEdit = () => {
    setEditing(!isEditing)
  }

  const submitUpdate = () => {
    //axios updateDeck call
    toggleEdit()
  }

  const updateTitleState = (e) => {
    setTitle(e.target.value)
  }

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
