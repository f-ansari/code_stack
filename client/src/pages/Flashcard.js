// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { BASE_URL } from '../globals'

const Flashcard = (props) => {
  //   const Flashcard = (props) => {
  //     const [getOneCard, setGetOneCard] = useState({})
  //     const { flashcardId } = props.match.params.id

  //     const getCard = async () => {
  //       try {
  //         const res = await axios.get(`${BASE_URL}/flashcards/${flashcardId}`)
  //         setGetOneCard(res.data)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }

  //     useEffect(() => {
  //       getOneCard()
  //     }, [flashcardId])

  return (
    <div>
      {/* <h1>{getOneCard.title}</h1>
      <p>{getOneCard.codeBlock}</p>
      <p>{getOneCard.notes}</p>
      <p>{getOneCard.language}</p> */}
      <button>Back to Deck</button>
    </div>
  )
  // }
}

export default Flashcard
