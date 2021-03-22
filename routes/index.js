const AppRouter = require('express').Router()
const userRouter= require('./userRouter')
const deckRouter= require('./deckRouter')


AppRouter.use('/users', userRouter)
AppRouter.use('/decks', deckRouter)


module.exports=AppRouter