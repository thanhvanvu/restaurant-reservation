const express = require('express')

const Router = express.Router()

// Connect to controller
const { register, login } = require('../controllers/authController')

Router.route('/register').post(register)

Router.route('/login').post(login)

module.exports = Router
