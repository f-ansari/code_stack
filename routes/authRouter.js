const Router = require('express').Router()
const controller = require('../controllers/AuthController')
const { StripToken, VerifyToken } = require('../middleware')

Router.post('/login', controller.Login)
Router.post('/register', controller.Register)

module.exports = Router
