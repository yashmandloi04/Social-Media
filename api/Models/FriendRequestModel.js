require('../Helpers/Conn')
const mongoose = require('mongoose')

const FriendRequestSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  reciver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // requestStatus: {
  //   reacted: Boolean,
  //   status: String,
  // },
})

module.exports = mongoose.model('friend_request',FriendRequestSchema)