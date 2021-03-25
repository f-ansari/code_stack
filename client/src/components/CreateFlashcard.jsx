import React, { useReducer } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import {
  SET_CODEBLOCK,
  SET_FLASHCARD_PREFS,
  SET_FLASHCARD_PUBLISHED
} from '../store/types'
import { BASE_URL } from '../globals'
import axios from 'axios'

const iState = {
  flashcard: {
    title: `CSS Tricks`,
    notes: `shorthand for setting margins`,
    codeBlock: `
    const App = () => {
      return (
        <h1>all the codes</h1>
      );
    }`,
    deckId: `1`,
    language: `css`
  },
  flashcardPublished: false
}
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CODEBLOCK:
      return { ...state, flashcard: { ...state, codeBlock: action.payload } }
    case SET_FLASHCARD_PREFS:
      return {
        ...state,
        flashcard: {
          ...state.flashcard,
          [action.payload.name]: action.payload.value
        }
      }
    case SET_FLASHCARD_PUBLISHED:
      return { ...state, flashcardPublished: action.payload }
    default:
      return state
  }
}

const CreateFlashcard = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  console.log(props.selectedDeck.id)

  const handleFlashcardSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${BASE_URL}/flashcards/${props.selectedDeck.id}`,
        state.flashcard
      )
      console.log(res)
      if (res) {
        dispatch({ type: SET_FLASHCARD_PUBLISHED, payload: true })
      } else console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const setCodeBlock = (e) => {
    console.log(e)
    dispatch({ type: SET_CODEBLOCK, payload: e })
  }

  const handleFieldsChange = (e) => {
    e.preventDefault()
    console.log('input entered!', e.target.name)
    dispatch({
      type: SET_FLASHCARD_PREFS,
      payload: { name: e.target.name, value: e.target.value }
    })
  }

  return !state.flashcardPublished ? (
    <div>
      <form>
        <input
          name="title"
          type="text"
          value={state.title}
          onChange={(event) => handleFieldsChange(event)}
          placeholder="title"
        />
        <select onChange={(event) => handleFieldsChange(event)}>
          <option>HTML</option>
          <option>Javascript</option>
          <option>CSS</option>
        </select>
        <select>
          {/* {props.decksByHandle.map((deck, idx) => (
            <option key={idx}>{deck.title}</option>
          ))} */}
        </select>
        <Editor
          value={state.flashcard.codeBlock}
          onValueChange={(code) => setCodeBlock(code)}
          onSubmit={(e) => handleFlashcardSubmit(e)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12
          }}
        />
        <textarea
          name="notes"
          type="text"
          value={state.notes}
          onChange={(event) => handleFieldsChange(event)}
          placeholder="write a note"
        />
        <button>Publish flashcard</button>
      </form>
      <div>
        <h3>{state.flashcard.title}</h3>
        <p>{state.flashcard.language}</p>
        <pre>
          <code>{state.flashcard.codeBlock}</code>
        </pre>
        <p>{state.flashcard.notes}</p>
      </div>
    </div>
  ) : (
    <h2>
      Your flashcard has been published to the
      {/* {props.selectedDeck.title}*/} ___ deck.
    </h2>
  )
}
export default CreateFlashcard

// const CreateFlashcard = (props) => {

//   const {selectedDeck} = props

//   const createFlashcard = async () => {
//     await axios.create(`${BASE_URL}/flashcards/${selectedDeck.id}`, {})
//   }

//   return (
//     <div>
//       <form onSubmit={createFlashcard}>
//         <input type='text' placeholder='title'/>
//         <input type='text' placeholder='notes'/>
//         <input type='text' placeholder='code'/>
//         <select>
//           <option>HTML</option>
//           <option>Javascript</option>
//           <option>CSS</option>
//         </select>
//         <input type='submit' value='Submit'/>
//       </form>
//       </div>
//   )
// }

// export default CreateFlashcard
