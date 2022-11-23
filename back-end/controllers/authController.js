const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Need to use async/await because of connecting with DABATSE
exports.register = async (req, res, next) => {
  try {
    // Case when creating user successfully
    // req.body contains name, email, password from user input
    // then use those data to create a user in DB ( using create() )
    const user = await User.create(req.body)

    // create TOKEN key
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET)

    // response back to client if successfully creating the user
    res.status(200).json({
      status: 'Success',
      data: { token, user, userName: user.name },
    })
  } catch (error) {
    res.json(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    // find user in DB with real email from user input (req.body.email)
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      //Error: Email is not correct
    }

    // compare 2 password
    // req.body.password: real password client input
    // user.password: password in DATABSE
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET)

      // response back to client if successfully creating the user
      res.status(200).json({
        status: 'Success',
        data: { token, user, userName: user.name },
      })
    } else {
      //Error: Password is not correct
    }
  } catch (error) {}
}
