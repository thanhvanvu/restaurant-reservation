const express = require('express')

const Router = express.Router()

const { verifyToken } = require('../middlewares/verifyToken')

// Connect to controller
const {
  getAllReservations,
  createOneReservation,
} = require('../controllers/reservationController')

Router.route('/reservationHistory').get(getAllReservations)

Router.route('/reservation').post(verifyToken, createOneReservation)

module.exports = Router
