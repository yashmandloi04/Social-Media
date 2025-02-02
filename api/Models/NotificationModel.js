require('../Helpers/Conn')
const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  reciverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  type: String,
  message: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
})
NotificationSchema.index({ created_at: -1 });


module.exports =  mongoose.model('notification', NotificationSchema)