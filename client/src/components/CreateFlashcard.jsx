import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../globals'

const CreateFlashcard = (props) => {

  const {selectedDeck} = props

  const createFlashcard = async () => {
    await axios.create(`${BASE_URL}/flashcards/${selectedDeck.id}`, {})
  }

  return (
    <div>
      <form onSubmit={createFlashcard}>
        <input type='text' placeholder='title'/>
        <input type='text' placeholder='notes'/>
        <input type='text' placeholder='code'/>
        <select>
          <option>HTML</option>
          <option>Javascript</option>
          <option>CSS</option>
        </select>
        <input type='submit' value='Submit'/>
      </form>
      </div>
  )
}

export default CreateFlashcard