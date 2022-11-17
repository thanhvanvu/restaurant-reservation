const express = require('express')

const Router = express.Router()

// Connect to controller
const { register } = require('../controllers/authController')

Router.route('/register').post(register)

module.exports = Router
