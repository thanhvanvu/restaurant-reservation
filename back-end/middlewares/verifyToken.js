const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  // Access Authorization from req header
  const Authorization = req.header('authorization')

  if (!Authorization) {
    // allow none user to create a reservation
    req.user = null
    next()
  } else {
    // If user is login --> Get Token
    // Token will be like: Bearer 1a213asdxcfa1516
    // use replace để remove Bearer and get token behind
    const token = Authorization.replace('Bearer ', '')

    // Verify Token
    const { userId } = jwt.verify(token, process.env.APP_SECRET)

    // assign req
    req.user = { userId }
    // after verify, use next() to move to createOneReservation...
    next()
  }
}
