const Router = require('express').Router()
const controller = require('../controllers/DeckController')
<<<<<<< HEAD
=======
const { StripHeaders, VerifyToken } = require('../middleware')

>>>>>>> 9411737c50cf1fb0bc5f79503bedac5c4b73c42d

Router.post('/:user_Id', controller.createDecks)
Router.get('/view/:deck_Id', controller.getOneDecks)
Router.get('/view', controller.getAllDecks)
Router.put('/:deck_Id', controller.updateDecks)
Router.delete('/:deck_Id', controller.deleteDecks)

module.exports = Router
