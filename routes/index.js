const AppRouter = require('express').Router()
const userRouter = require('./userRouter')
const deckRouter = require('./deckRouter')
const flashcardRouter = require('./flashcardRouter')

AppRouter.use('/users', userRouter)
AppRouter.use('/decks', deckRouter)
AppRouter.use('/flashcards', flashcardRouter)

module.exports = AppRouter
