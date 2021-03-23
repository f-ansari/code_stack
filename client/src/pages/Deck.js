import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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

  const history = useHistory()
  const redirectToFlashcardPage = (id) => {
    history.push(`/flashcard/${id}`)
  }

  return (
    <div>
      <h1>Profile: {selectedUser ? selectedUser.handle : null}</h1>
      {renderProfileButton()}
      <img
        src={selectedUser ? selectedUser.avatarUrl : null}
        alt={`avatar for ${selectedUser ? selectedUser.handle : null}`}
      />
      <h1>Deck</h1>
      <button>Edit</button>
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
