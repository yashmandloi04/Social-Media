require('../Helpers/Conn')
const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: String,
  body: String,
  reaction: {
    like: {
      likeList: [{
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        status: String,
      }],
      likeStatus: Boolean,
      likeCount: Number,
    },
    comment: {
      commentList: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
          },
          message: String,
          created_at: {
            type: Date,
            default: Date.now,
            required: true,
          },
        }
      ]
    },
  },
  tags: [String],
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  image: String,
})
module.exports = mongoose.model('post', PostSchema)