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

const Flashcard = (props) => {
  console.log('props', props)

  console.log('props fro App', props.selectedFlashcard)
  console.log('props user App', props.selectedUser)

  const { selectedUser, selectedFlashcard, history, selectedDeck } = props
  console.log(selectedFlashcard.codeBlock)
  const codeString = `${selectedFlashcard.codeBlock}`

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
      const res = await axios.delete(
        `${BASE_URL}/flashcards/${selectedFlashcard.id}`
      )
      history.push(`/deck/${selectedDeck.id}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const setCodeBlock = (code) => {
    console.log(code)
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
        {/* <pre>
          <SyntaxHighlighter language="javascript" style={dark}>      // if all crash and burn. use this line of code
            {codeString}
          </SyntaxHighlighter>
        </pre> */}
        <div className="editor">
          <pre>
            <code>{selectedFlashcard.codeBlock}</code>
          </pre>

          {/* <Editor
            className="editor"
            value={selectedFlashcard.codeBlock}
            onValueChange={(code) => setCodeBlock(code)}
            highlight={(code) => highlight(code, languages.js)}
            padding={30}
          /> */}
        </div>
        <h4>notes: {selectedFlashcard.notes}</h4>
      </section>
      {props.currentUser && props.currentUser.handle === selectedUser.handle ? (
        <button onClick={(e) => deleteFlashcard(e)}>Delete Flashcard</button>
      ) : null}
    </div>
  )
}

export default Flashcard
