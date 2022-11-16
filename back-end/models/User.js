const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: [true, 'Name must be required'],
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email must be required'],
    },

    password: {
      type: String,
      trim: true,
      required: [true, 'Password must be required'],
      minLength: [6, 'Password must be at least 6 characters'],
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

// exports to use it later
module.exports = User
