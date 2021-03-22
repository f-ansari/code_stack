const Router = require('express').Router()
const controller = require('../controllers/UserController')
const { StripHeaders, VerifyToken } = require('../middleware')

Router.get('/:handle', controller.getOneUser)

Router.post('/', controller.createUser)

Router.put('/:handle', controller.updateUser)

Router.delete('/:handle', controller.deleteUser)

module.exports = Router
