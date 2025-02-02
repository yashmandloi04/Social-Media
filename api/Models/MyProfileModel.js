require('../Helpers/Conn')
const mongoose = require('mongoose')

const MyprofileSchema = mongoose.Schema({
  bg_image: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  friends: {
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model('myprofile', MyprofileSchema)