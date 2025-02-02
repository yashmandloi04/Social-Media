const router = require('express').Router()
const Post = require('../../Models/PostModel.js')
const Notification = require('../../Models/NotificationModel.js')
const JWT = require('jsonwebtoken')

router.get('/', async (req, res)=>{
  let allComment = await Post.find()
  res.send(allComment)
})
router.get('/:id', async (req, res)=>{
  // console.log('=================')
  let idComment = await Post.find({ _id: req.params.id}).populate('userId').populate('reaction.comment.commentList.userId').sort({'reaction.comment.commentList.created_at': -1}).exec()
  res.send(idComment)
})
router.post('/', async (req, res)=>{
  let token = req.headers.authorization
  let objId = JWT.decode(token, process.env.ACCESS_TOKEN_SECRET)
  req.body = { ...req.body, userId: objId._id}
  let createdComment = await Post.create(req.body)
  res.send(createdComment)
})
router.put('/:id', async (req, res)=>{
  let token = req.headers.authorization
  let objId = JWT.decode(token, process.env.ACCESS_TOKEN_SECRET)
  let response = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        'reaction.comment.commentList': {
          userId: objId._id,
          message: req.body.message,
        }
      },
    }
  )
  if(objId._id != req.params.id){
    await Notification.create({
      senderId: objId._id,
      reciverId: req.params.id,
      type: 'comment',
      message: 'commented on your post.',
    })
  }
  res.send(response)
})
router.delete('/:id', async (req, res)=>{
  let deletedComment = await Post.deleteMany({ _id: req.params.id})
  res.send(deletedComment)
})

module.exports = router