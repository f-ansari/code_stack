const Router = require('express').Router()
const controller = require('../controllers/DeckController')
const { StripToken, VerifyToken } = require('../middleware')

Router.post('/:user_Id', StripToken,VerifyToken, controller.createDecks)
Router.get('/view/:deck_Id', controller.getOneDecks)
Router.get('/view', controller.getAllDecks)
Router.put('/:deck_Id', StripToken, VerifyToken, controller.updateDecks)
Router.delete('/:deck_Id', StripToken, VerifyToken, controller.deleteDecks)

module.exports = Router
