const express = require('express')
const cors = require('cors')
const app = express()

//config dotenv
require('dotenv').config()

// function to boot server
const bootServer = () => {
  // Body Parser: Convert input from user into object
  app.use(express.json())

  // Cors: connect client and server
  app.use(cors())

  const port = process.env.APP_PORT

  app.get('/', (req, res, next) => {
    res.status(200).json({
      status: 'Success',
      data: {
        reservations: [
          {
            content: 'Hello World',
            date: '9/3/2022',
          },
        ],
      },
    })
  })

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
