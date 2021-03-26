import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-git'
import 'prismjs/components/prism-css'

// import 'prismjs/themes/prism-tomorrow.css'
import '../style/CreateFlashcard.css'
import 'prism-theme-night-owl/build/style.css'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'      // if all crash and burn. use this line of code
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// import '../style/CreateFlashcard.css'
// import SyntaxHighlighter from 'react-syntax-highlighter'
// import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
// const Flashcard = (props) => {
//   const {
//     selectedUser,
//     selectedFlashcard,
//     history,
//     selectedDeck,
//     currentUser
//   } = props
//   console.log(props)
//   const backToUsersDeck = () => {
//     try {
//       history.push(`/deck/${selectedDeck.id}`)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const deleteFlashcard = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.delete(
//         `${BASE_URL}/flashcards/${selectedFlashcard.id}`
//       )
//       history.push(`/deck/${selectedDeck.id}`)
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <div>
//       {selectedUser && (
//         <div>
//           <button onClick={backToUsersDeck}>Back to Deck</button>
//           <h1>Profile: {selectedUser.handle}</h1>
//           <img
//             src={selectedUser.avatarUrl}
//             alt={`avatar for ${selectedUser.handle}`}
//           />
//         </div>
//       )}
//       {selectedFlashcard ? (
//         <section
//           style={{
//             margin: '2em auto',
//             maxWidth: '40em',
//             backgroundColor: 'darkslategray',
//             borderRadius: '0.5em',
//             padding: '1em'
//           }}
//         >
//           <h3>Title: {selectedFlashcard.title}</h3>
//           <h4>language: {selectedFlashcard.language}</h4>
//           <SyntaxHighlighter
//             language="javascript"
//             style={nightOwl}
//             customStyle={{
//               maxWidth: '40em',
//               borderRadius: '0.25em',
//               margin: '0 auto'
//             }}
//           >
//             {typeof selectedFlashcard.codeBlock === 'string'
//               ? selectedFlashcard.codeBlock
//               : '//hello world'}
//           </SyntaxHighlighter>
//           <h4>notes: {selectedFlashcard.notes}</h4>
//         </section>
//       ) : null}
//       {currentUser &&
//       currentUser.Decks &&
//       currentUser.Decks.some((deck) => deck.id === selectedFlashcard.deckId) ? (
//         <button onClick={(e) => deleteFlashcard(e)}>Delete Flashcard</button>
//       ) : null}
//     </div>
//   )
// }
// export default Flashcard

const Flashcard = (props) => {
  const {
    selectedUser,
    selectedFlashcard,
    history,
    selectedDeck,
    currentUser
  } = props

  const backToUsersDeck = () => {
    try {
      history.push(`/deck/${selectedDeck.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFlashcard = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`${BASE_URL}/flashcards/${selectedFlashcard.id}`)
      history.push(`/deck/${selectedDeck.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <section className="main-container">
        <button className="page-buttons" onClick={backToUsersDeck}>
          Back to Deck
        </button>
        <h1>@{selectedUser ? selectedUser.handle : null}</h1>
        <img
          className="profile-img"
          src={selectedUser ? selectedUser.avatarUrl : null}
          alt={`avatar for ${selectedUser ? selectedUser.handle : null}`}
        />

        <section className="flashcard">
          <h3>Title: {selectedFlashcard.title}</h3>
          <h4>language: {selectedFlashcard.language}</h4>

          <div className="editor-view">
            <pre>
              <code>{selectedFlashcard.codeBlock}</code>
            </pre>
          </div>
          <h4>notes: {selectedFlashcard.notes}</h4>
        </section>
        {currentUser &&
        currentUser.Decks &&
        currentUser.Decks.some(
          (deck) => deck.id === selectedFlashcard.deckId
        ) ? (
          <button onClick={(e) => deleteFlashcard(e)}>Delete Flashcard</button>
        ) : null}
      </section>
    </div>
  )
}

export default Flashcard
