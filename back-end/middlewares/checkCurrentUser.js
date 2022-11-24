const jwt = require('jsonwebtoken')

exports.checkCurrentUser = (req, res, next) => {
  // Access Authorization from header
  const Authorization = req.header('authorization')

  if (!Authorization) {
    req.user = null
    next()
  } else {
    // Get Token from Authorization
    const token = Authorization.replace('Bearer ', '')

    // Verify Token
    try {
      const { userId } = jwt.verify(token, process.env.APP_SECRET)
      req.user = { userId }
      next()
    } catch (error) {
      // if cannot verify the token -> set user = null
      req.user = null
      next()
    }
  }
}
