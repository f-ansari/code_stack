const AppRouter = require('express'). Router()
const userRouter= require('./userRouter')


AppRouter.use('/users', userRouter)
module.exports=AppRouter