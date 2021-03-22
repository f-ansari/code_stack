const Router = require('express').Router()
const { route } = require('.')
const controller = require('../controllers/UserController')
const { StripHeaders, VerifyToken } = require('../middleware')


Router.get('/')
Router.get('/profile/:handle')
Router.get('/getDecks')

Router.post('/createDecks')
Router.post('/createFlashcard')

Router.delete('/deleteDeck')
Router.delete('/deleteFlashcard')




module.exports = Router