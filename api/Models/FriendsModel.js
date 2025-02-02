require('../Helpers/Conn')
const mongoose = require('mongoose')

const FriendsSchema = mongoose.Schema({
  me: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  myFriend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
})

module.exports = mongoose.model('friend',FriendsSchema)