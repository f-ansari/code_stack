import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../globals'

const Flashcard = (props) => {
  console.log('props', props)

  console.log('props fro App', props.selectedFlashcard)
  console.log('props user App', props.selectedUser)

  const { selectedUser, selectedFlashcard, history, selectedDeck } = props
  console.log(selectedDeck)

  const backToUsersDeck = () => {
    try {
      history.push(`/deck/${selectedDeck.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFlashcard = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.delete(`${BASE_URL}/flashcards/${selectedFlashcard.id}`)
      history.push(`/deck/${selectedDeck.id}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

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
      <button onClick={(e)=>deleteFlashcard(e)}>Delete Flashcard</button>
    </div>
  )
}

export default Flashcard
