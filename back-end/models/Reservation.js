const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      trim: true,
      // required: [true, 'Email must be required'],
    },

    // phone_number: {
    //   type: String,
    //   trim: true,
    // },

    // date: {
    //   type: Date,
    //   trim: true,
    // },

    // time: {
    //   type: String,
    //   trim: true,
    // },

    // total_guest: {
    //   type: Number,
    //   trim: true,
    // },

    // special_request: {
    //   type: String,
    // },

    // confirmation_code: {
    //   type: String,
    //   trim: true,
    // },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // randomGeneratedString: {
    //   type: String,
    //   minLength: 5,
    //   maxlength: 5,
    // },
  },
  { timestamps: true }
)

// reservationSchema.pre('save', async function (next) {
//   const randomInteger = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min
//   }
//   this.confirmation_code = Math.random()
//     .toString(36)
//     .substr(2, randomInteger(1, 9))
//   next()
// })

const Reservation = mongoose.model('Reservation', reservationSchema)

// exports to use it later
module.exports = Reservation
