const Router = require('express').Router()
const controller = require('../controllers/DeckController')



Router.post('/:user_id', controller.createDecks)
Router.get('/view/:user_id', controller.getAllDecks)
Router.put('/:deck_id', controller.updateDecks)
Router.delete('/:deck_id', controller.deleteDecks)