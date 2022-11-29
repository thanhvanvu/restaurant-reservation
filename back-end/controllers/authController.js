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
      data: {
        token,
        userId: user._id,
        userName: user.name,
        mailing_address: user.mailing_address,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Login
exports.login = async (req, res, next) => {
  try {
    // find user in DB with real email from user input (req.body.email)
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      //Error: Email is not correct
      const err = new Error('Email is not correct!')
      err.statusCode = 400
      return next(err) //exit code when meeting the error
    }

    // compare 2 password
    // req.body.password: real password client input
    // user.password: password in DATABSE
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET)

      // response back to client if successfully creating the user
      res.status(200).json({
        status: 'Success',
        data: {
          token,
          userId: user._id,
          userName: user.name,
          mailing_address: user.mailing_address,
        },
      })
    } else {
      //Error: Password is not correct
      const err = new Error('Password is not correct!')
      err.statusCode = 400
      return next(err) //exit code when meeting the error
    }
  } catch (error) {
    res.json(error)
  }
}

// Get Current User
exports.getCurrentUser = async (req, res, next) => {
  try {
    // set initial user = null
    const data = { user: null }
    if (req.user) {
      // user: { userId: '6322fd1c2844c13387749512' }
      const user = await User.findOne({ _id: req.user.userId })
      data.user = {
        userId: user._id,
        userName: user.name,
        mailing_address: user.mailing_address,
      }
    }

    // response back to client if successfully get current user
    res.status(200).json({
      status: 'Success',
      data: data,
    })
  } catch (error) {
    res.json(error)
  }
}

// Update Current User
exports.updateCurrentUser = async (req, res, next) => {
  try {
    // Params is the id in the https address
    // https/abc.com/61547835151 ==> params = 61547835151
    const { userId } = req.params
    // console.log({ userId })

    const userProfile = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidator: true }
    )

    res.status(200).json({
      status: 'success',
      data: { userProfile },
    })
  } catch (error) {
    next(error)
  }
}
