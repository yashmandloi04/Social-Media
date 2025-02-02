const router = require('express').Router()
const { response } = require('express')
const Post = require('../../Models/PostModel')
const Notification = require('../../Models/NotificationModel')
const JWT = require('jsonwebtoken')

// will send true if user present in liked post list
router.get('/likelist/:postId', async (req, res) => {
  let token = req.headers.authorization
  let objId = JWT.decode(token, process.env.ACCESS_TOKEN_SECRET)
  let postId = req.params.postId
  // let response = await Post.find({$and: [{_id: postId}, {reaction: {like: {$in: objId._id}}}]})
  let response = await Post.findOne({
    _id: postId,
    'reaction.like.userId': objId._id,
  })

  // Find how to get the array
  if (response) {
  }
  if (response) {
    res.send({
      success: true,
      type: response.reaction.like[0].status,
    })
  } else {
    res.send({
      success: false,
    })
  }
})

// will accept post _id
router.get('/:id', async (req, res) => {
  let response = await Post.find({ _id: req.params.id }).select('reaction.like').populate('userId')
  res.send(response)
})

// recives id of post in params and user who liked id through headers.
router.put('/:id', async (req, res) => {
  let token = req.headers.authorization
  let objId = JWT.decode(token, process.env.ACCESS_TOKEN_SECRET)
  // console.log(objId)
  // return;
  let { method } = req.body
  if (method === 'like') {
    let confi = await Post.findOne({
      _id: req.params.id,
      'reaction.like.likeList.userId': objId._id,
    })
    if (confi) {
      let response = await Post.updateOne(
        {
          _id: req.params.id,
          'reaction.like.likeList.userId': objId._id,
        },
        {
          $set: { 'reaction.like.likeList.$.status': 'like' },
          $inc: { 'reaction.like.likeCount': 1 },
        }
      );
      res.send(response)
    }
    else {
      let response = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            'reaction.like.likeList': {
              userId: objId._id,
              status: 'like'
            }
          },
          $inc: {
            'reaction.like.likeCount': 1,
          },
        }
      )
      res.send(response)
    }
    if(objId._id != req.params.id){
      await Notification.create({
        senderId: objId._id,
        reciverId: req.params.id,
        type: 'like',
        message: 'liked your post.',
      })
    }
  } else {
    let response = await Post.updateOne(
      {
        _id: req.params.id,
        'reaction.like.likeList.userId': objId._id,
      },
      {
        $set: { 'reaction.like.likeList.$.status': 'dislike' },
        $inc: { 'reaction.like.likeCount': -1 },
      }
    );
    res.send(response)
  }
})

module.exports = router