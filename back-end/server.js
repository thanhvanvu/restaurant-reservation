const express = require('express')
const cors = require('cors')
const app = express()
const authRoute = require('./routes/authRoute')
const reservationRoute = require('./routes/reservationRoute')

//config dotenv
require('dotenv').config()

// function to boot server
const bootServer = () => {
  // Body Parser: Convert input from user into object
  app.use(express.json())

  // Cors: connect client and server
  app.use(cors())

  const port = process.env.APP_PORT

  // Mount the route
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/reservations', reservationRoute)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

// Connect to Database MongoDB
// Then boot the server
const { connectDB } = require('./config/db')
connectDB()
  .then(() => console.log('DB connection successfully'))
  .then(() => bootServer())
