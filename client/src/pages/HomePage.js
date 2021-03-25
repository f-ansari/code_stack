import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import { SET_SELECTED_DECK, SET_SELECTED_USER } from '../store/types'

const HomePage = (props) => {
  const [decks, setDecks] = useState([])

  const getAllDecks = async () => {
    const res = await axios.get(`${BASE_URL}/decks/view`)
    setDecks(res.data)
  }

  const renderDecksByHandle = () => {
    return decks.map((deck, idx) => (
      <div key={`${idx}`} onClick={() => handleClick(deck)}>
        <h3>Deck Title: {deck.title}</h3>
        <h3>Created By: {deck.User.handle}</h3>
      </div>
    ))
  }

  const handleClick = (deck) => {
    console.log(deck)
    props.dispatch({ type: SET_SELECTED_USER, payload: deck.User })
    props.dispatch({ type: SET_SELECTED_DECK, payload: deck })
    props.history.push(`/deck/${deck.id}`)
  }

  useEffect(() => {
    getAllDecks()
  }, [])

  return (
    <div>
      <h2>Library</h2>
      {renderDecksByHandle()}
    </div>
  )
}

export default HomePage
