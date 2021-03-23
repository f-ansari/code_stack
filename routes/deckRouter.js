const Router = require('express').Router()
const controller = require('../controllers/DeckController')
const { StripHeaders, VerifyToken } = require('../middleware')

Router.post('/:user_Id', controller.createDecks)
Router.get('/view/:deck_Id', controller.getOneDecks)
Router.get('/view', controller.getAllDecks)
Router.put('/:deck_Id', controller.updateDecks)
Router.delete('/:deck_Id', controller.deleteDecks)

module.exports = Router
