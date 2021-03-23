import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Flashcard = () => {
  // const[notes, setnotes]=useState('')
  // const[language, setlanguge] =useState('')
  // const[codeBlock, setCodeBlock]= useState('')
  // const[title, settitle]= useState('')
  const [getOneCard, setGetOneCard]=useState('')

  const getOneCard= async () =>{
    try{
      const res = await axios.get(`${BASE_URL}/flashcard/one/${deckId}`)
      setGetOneCard(res.data)
    } catch (error){
      console.log(error)
    }
  }

useEffect(()=>{

},[])







  return(
    <div>
      <h1>{props.title}</h1>
      <p>{props.codeBlock}</p>
      <p>{props.noted}</p>
      <p>{props.language}</p>
      <button>Back to Flashcard</button>
    </div>
  )}

export default Flashcard
