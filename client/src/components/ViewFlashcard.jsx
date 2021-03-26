import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../globals'

const ViewFlashcard = (props) => {
  
  
  const deleteFlashcard = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.delete(`${BASE_URL}/flashcard/${props.flashcard.id}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return ( 
        <div>
          <h1>ViewFlashcard</h1>  
          <button onClick={(e)=>deleteFlashcard(e)}>Delete Flashcard</button>
        </div>
  
  
  )}


export default ViewFlashcard
