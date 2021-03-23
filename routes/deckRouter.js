const Router = require('express').Router()
const controller = require('../controllers/DeckController')



Router.post('/:user_Id', controller.createDecks)
Router.get('/view', controller.getAllDecks)
Router.get('/view/:deck_Id', controller.getOneDecks)
Router.put('/:deck_Id', controller.updateDecks)
Router.delete('/:deck_Id', controller.deleteDecks)

module.exports=Router