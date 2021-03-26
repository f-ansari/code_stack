import React, { useReducer, useEffect } from 'react'
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
import {
  SET_CODEBLOCK,
  SET_FLASHCARD_PREFS,
  SET_FLASHCARD_PUBLISHED,
  SET_FLASHCARD_DECK_ID,
  SET_FLASHCARD_LANG
} from '../store/types'
import { BASE_URL } from '../globals'
import axios from 'axios'

const langs = ['javascript', 'python', 'json', 'css']

langs.forEach((lang) => {
  console.log(langs)
  return import(`prismjs/components/prism-${lang}`)
})

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
    deckId: 5, /// comeback to add useEffect to set inital value
    language: `css`
  },
  flashcardPublished: false,
  deckName: ''
}
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CODEBLOCK:
      return {
        ...state,
        flashcard: { ...state.flashcard, codeBlock: action.payload }
      }
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
    case SET_FLASHCARD_DECK_ID:
      return {
        ...state,
        flashcard: { ...state.flashcard, deckId: action.payload.deckId },
        deckName: action.payload.deckName
      }
    case SET_FLASHCARD_LANG:
      return {
        ...state,
        flashcard: { ...state.flashcard, language: action.payload }
      }
    default:
      return state
  }
}

const CreateFlashcard = (props) => {
  console.log(props.currentUserSelectedDeck.id)
  const [state, dispatch] = useReducer(reducer, iState)
  console.log(props)
  const handleFlashcardSubmit = async (e) => {
    e.preventDefault()
    console.log('publish button clicked')
    console.log(state.flashcard)

    if (props.currentUserSelectedDeck.id)
      try {
        const res = await axios.post(
          `${BASE_URL}/flashcards/${props.currentUserSelectedDeck.id}`,
          state.flashcard
        )
        console.log('response', res)
        dispatch({ type: SET_FLASHCARD_PUBLISHED, payload: true })
        // if (res) {
        //   dispatch({ type: SET_FLASHCARD_PUBLISHED, payload: true })
        // } else console.log(res)
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
    console.log('input entered!', e.target.name, e.target.value)
    dispatch({
      type: SET_FLASHCARD_PREFS,
      payload: { name: 'language', value: e.target.value }
    })
  }

  const setDeck = (title, id) => {
    console.log('deckName', title, id)
    dispatch({
      type: SET_FLASHCARD_DECK_ID,
      payload: { deckName: title, deckId: id }
    })
  }

  const setLang = (lang) => {
    dispatch({
      type: SET_FLASHCARD_LANG,
      payload: lang
    })
  }

  const initFlashcardDeckState = () => {
    dispatch({
      type: SET_FLASHCARD_DECK_ID,
      payload: { deckId: props.currentUserSelectedDeck.id }
    })
  }

  useEffect(() => {
    initFlashcardDeckState()
  }, [state.deckId])

  return !state.flashcardPublished ? (
    <div>
      <form onSubmit={(e) => handleFlashcardSubmit(e)} className="container">
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
          {langs.map((lang, idx) => (
            <option
              key={idx}
              name="language"
              value={lang}
              onClick={() => setLang(lang)}
            >
              {lang}
            </option>
          ))}
        </select>

        <select>
          {props.currentUserData
            ? props.currentUserData.Decks.map((deck, idx) => (
                <option
                  key={idx}
                  name={deck.id}
                  value={deck.title}
                  onClick={() => setDeck(deck.title, deck.id)}
                >
                  {deck.title}
                </option>
              ))
            : null}
        </select>
        <div className="container__editor">
          <Editor
            className="editor"
            value={state.flashcard.codeBlock}
            onValueChange={(code) => setCodeBlock(code)}
            highlight={(code) => highlight(code, languages.js)}
            padding={30}
          />
        </div>
        {/* <textarea
          name="codeBlock"
          type="text"             // if all crash and burn. use this line of code
          value={state.codeBlock}
          onChange={(event) => handleFieldsChange(event)}
          placeholder="write a code"
        /> */}
        <textarea
          name="notes"
          type="text"
          value={state.notes}
          onChange={(event) => handleFieldsChange(event)}
          placeholder="write a note"
        />
        <button>Publish flashcard</button>
      </form>
      {/* <div>
        <h3>{state.flashcard.title}</h3>
        <p>{state.flashcard.language}</p> */}
      {/* <pre>
        <SyntaxHighlighter language="javascript" style={dark}>
          {state.flashcard.codeBlock} // if all crash and burn. use this line of code
        </SyntaxHighlighter>
        </pre> */}
      {/* <code>{state.flashcard.codeBlock}</code>
        <p>{state.flashcard.notes}</p>
      </div>*/}
    </div>
  ) : (
    <h2>Your flashcard has been published to the {state.deckName} deck.</h2>
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

