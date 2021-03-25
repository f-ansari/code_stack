import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'

const Library = (props) => {
  const [decks, setDecks] = useState([])

  const getAllDecks = async () => {
    const res = await axios.get(`${BASE_URL}/decks/view`)
    setDecks(res.data)
  }

  const renderDecksByHandle = () => {
    return decks.map((deck, idx) => (
      <div key={`${idx}`} onClick={() => targetDeck(deck)}>
        <h3>Deck Title: {deck.title}</h3>
      </div>
    ))
  }

  const targetDeck = (deck) => {
    props.dispatch({ type: SET_SELECTED_DECK, payload: deck })
    props.history.push(`/deck/${deck.id}`)
  }

  useEffect(() => {
    getAllDecks()
  })

  return (
    <div>
      <h2>Library</h2>
      {renderDecksByHandle()}
    </div>
  )
}

export default Library
