import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Flashcard = (props) => {
  const [getOneCard, setGetOneCard]=useState('')
  const { flashcardId }= props.match.params

  const getOneCard= async () =>{
    try{
      const res = await axios.get(`${BASE_URL}/flashcards/${flashcardId}`)
      setGetOneCard(res.data)
    } catch (error){
      console.log(error)
    }
  }

useEffect(()=>{
getOneCard()
},[flashcardId])





  return(
    <div>
      <h1>{props.title}</h1>
      <p>{props.codeBlock}</p>
      <p>{props.notes}</p>
      <p>{props.language}</p>
      <button>Back to Deck</button>
    </div>
  )}

export default Flashcard
