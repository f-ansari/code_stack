const AppRouter = require('express').Router()
const userRouter = require('./userRouter')
const deckRouter = require('./deckRouter')
const flashcardRouter = require('./flashcardRouter')
const authRouter = require('./authRouter')

AppRouter.use('/users', userRouter)
AppRouter.use('/decks', deckRouter)
AppRouter.use('/flashcards', flashcardRouter)
AppRouter.use('/auth', authRouter)

module.exports = AppRouter
