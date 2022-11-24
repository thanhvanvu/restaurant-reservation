// npm i mongoose

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI
    const connect = await mongoose.connect(uri, {})
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = { connectDB }
