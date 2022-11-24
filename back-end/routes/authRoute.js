const express = require('express')

const Router = express.Router()

// Connect to controller
const {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/authController')
const { checkCurrentUser } = require('../middlewares/checkCurrentUser')

Router.route('/register').post(register)

Router.route('/login').post(login)

Router.route('/').get(checkCurrentUser, getCurrentUser)

Router.route('/userProfile').get(checkCurrentUser, getCurrentUser)

Router.route('/userProfile/:userId').put(updateCurrentUser)
module.exports = Router
