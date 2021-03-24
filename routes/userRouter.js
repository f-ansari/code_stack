const Router = require('express').Router()
const controller = require('../controllers/UserController')
const { StripToken, VerifyToken } = require('../middleware')

Router.get('/:handle', controller.getOneUser)

Router.post('/', StripToken, VerifyToken, controller.createUser)

Router.put('/:handle', StripToken, VerifyToken,controller.updateUser)

Router.delete('/:handle', StripToken,VerifyToken,controller.deleteUser)

module.exports = Router
