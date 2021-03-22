const Router = require('express').Router()
const controller = require('../controllers/FlashcardController')
const { StripHeaders, VerifyToken } = require('../middleware')

Router.get('/:flashcard_id', controller.getFlashcard)
Router.get('/deck/:deck_id', controller.getFlashcardsByDeck)

Router.post('/:deck_id', controller.createFlashcard)

Router.put('/:flashcard_id', controller.updateFlashcard)

Router.delete('/:flashcard_id', controller.deleteFlashcard)

module.exports = Router
