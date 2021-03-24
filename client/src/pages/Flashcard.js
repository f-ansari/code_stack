import React, { useState, useEffect } from 'react'

const Flashcard = (props) => {
  console.log('props', props)

  console.log('props fro App', props.selectedFlashcard)
  console.log('props user App', props.selectedUser)

  const { selectedUser, selectedFlashcard, selectedDeck } = props
  console.log(selectedDeck)

  const backToUsersDeck = () => {
    try {
      props.history.push(`/user/${selectedUser.handle}/{selecetedDeck.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // getCard()
  })
  //
  return (
    <div>
      <button onClick={backToUsersDeck}>Back to Deck</button>
      <h1>Profile: {selectedUser ? selectedUser.handle : null}</h1>
      <img
        src={selectedUser ? selectedUser.avatarUrl : null}
        alt={`avatar for ${selectedUser ? selectedUser.handle : null}`}
      />

      <section>
        <h3>Title: {selectedFlashcard.title}</h3>
        <h4>language: {selectedFlashcard.language}</h4>
        <pre>codeblock: "some codeblock"{selectedFlashcard.codeblock}</pre>
        <h4>notes: {selectedFlashcard.notes}</h4>
      </section>
    </div>
  )
}

export default Flashcard
