const Router = require('express').Router()
const controller = require('../controllers/FlashcardController')
const { StripToken, VerifyToken } = require('../middleware')

Router.get('/:flashcard_id', controller.getFlashcard)
Router.get('/deck/:deck_id', controller.getFlashcardsByDeck)

Router.post('/:deck_id', StripToken, VerifyToken, controller.createFlashcard)

Router.put('/:flashcard_id',StripToken, VerifyToken,controller.updateFlashcard)

Router.delete('/:flashcard_id', StripToken,VerifyToken,controller.deleteFlashcard)

module.exports = Router
