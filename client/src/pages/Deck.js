import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  SET_SELECTED_FLASHCARD,
  SET_SELECTED_DECK,
  GET_DECKS_BY_HANDLE,
  SET_CURRENT_USER_DATA,
  SET_CURRENT_USER_SELECTED_DECK,
  SET_CURRENT_USER_SELECTED_DECK_IDX,
  SET_SELECTED_USER,
  ADD_TO_CURRENT_USER_DECK,
  UPDATE_CURRENT_USER_DECK
} from '../store/types'

const Deck = (props) => {
  console.log(props)
  const {
    selectedDeck,
    decksByHandle,
    currentUserData,
    currentUserSelectedDeck,
    currentUserDeckIdx
  } = props

  const [isEditing, setEditing] = useState(false)
  const [deckTitle, setTitle] = useState(currentUserSelectedDeck.title)
  const [flashcards, setFlashcards] = useState([])
  const [storedDecksByHandle, setDecksByHandle] = useState(decksByHandle)
  const [storedSelectedUser, setSelectedUser] = useState(currentUserData)

  const history = useHistory()

  // RENDER BUTTONS CONDITIONALLY

  const renderProfileButton = () => {
    return (
      <div>
        <button onClick={() => history.push('/editor')}>
          + Create Flashcard
        </button>
      </div>
    )
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
    console.log('props.selectedDeck.id:', currentUserSelectedDeck)
    try {
      const response = await axios.get(
        `${BASE_URL}/flashcards/deck/${currentUserSelectedDeck.id}`
      )
      console.log('res for getFlashcardsByDeck', response.data)
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

    // const updatedDeckIndex = currentUserSelectedDeck.index

    // console.log(
    //   currentUserData.Decks[currentUserDeckIdx]
    //   // currentUserData.Decks[currentUserSelectedDeck.index].title
    // )
    try {
      const res = await axios.put(
        `${BASE_URL}/decks/${props.match.params.deckId}`,
        {
          title: deckTitle
        }
      )
      console.log('res', res.data[1])
      const deck = res.data[1][0]
      props.dispatch({
        type: UPDATE_CURRENT_USER_DECK,
        payload: { deck: deck, id: deck.id }
      })
      props.dispatch({
        type: SET_CURRENT_USER_SELECTED_DECK,
        payload: {
          ...currentUserSelectedDeck,
          title: deckTitle
        }
      })
      toggleEdit()
    } catch (error) {
      console.log(error)
    }
  }

  const updateTitleState = (e) => {
    setTitle(e.target.value)
  }

  //UPDATE LIKES

  const updateLikes = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/decks/likes/${currentUserSelectedDeck.id}`
      )
      console.log(res.data[1][0])
      console.log(currentUserSelectedDeck)
      props.dispatch({
        type: SET_CURRENT_USER_SELECTED_DECK,
        payload: res.data[1][0]
      })
    } catch (error) {
      console.log(error)
    }
  }

  //USE EFFECT

  useEffect(() => {
    getFlashcardsByDeck()
    setDecksByHandle(storedDecksByHandle)
    setSelectedUser(storedSelectedUser)
  }, [])
  console.log(flashcards)
  return (
    <div>
      <h1>
        Profile:{' '}
        {currentUserData && currentUserData.handle
          ? currentUserData.handle
          : null}
      </h1>
      {renderProfileButton()}
      <img
        src={currentUserData ? currentUserData.avatarUrl : null}
        alt={`avatar for ${
          currentUserData ? currentUserData.handle : 'undefined'
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
          <button
            onClick={() => history.push(`/user/${currentUserData.handle}`)}
          >
            Return to profile
          </button>
        </div>
      )}

      <p>
        <button onClick={updateLikes}>Like</button>
        {currentUserSelectedDeck.likeCount}
      </p>
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
  )
}

export default Deck
