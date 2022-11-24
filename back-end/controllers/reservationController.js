const Reservation = require('../models/Reservation')

// Get all Reservation
exports.getAllReservations = async (req, res, next) => {
  try {
    // find({}) will return an array of reservations
    // populate() will show the information of customer field
    const reservations = await Reservation.find({}).populate('customer', 'name')

    // response back to client if successfully connect to DB
    res.status(200).json({
      status: 'Success',
      results: reservations.length,
      data: { reservations },
    })
  } catch (error) {
    res.json(error)
  }
}

// Create reservation
exports.createOneReservation = async (req, res, next) => {
  try {
    //req.user is from verifyToken
    const { userId } = req.user

    console.log({ userId })
    const reservation = await Reservation.create({
      ...req.body,
      customer: userId,
    })

    // response back to client if successfully connect to DB
    res.status(200).json({
      status: 'Success',
      data: { reservation },
    })
  } catch (error) {
    res.json(error)
  }
}
