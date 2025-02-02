const router = require('express').Router()
const Friends = require('../Models/FriendsModel')
const FriendsRequest = require('../Models/FriendRequestModel')
const Notification = require('../Models/NotificationModel')
const JWT = require('jsonwebtoken')

router.get(`/`, async (req, res)=>{
  // console.log(req.headers.authorization)
  let token = JWT.decode(req.headers.authorization)
  let allFriends = await Friends.find({me: token._id}).populate('myFriend')
  // console.log(allFriends)
  res.send(allFriends)
})

router.post('/', async (req, res) => {
  let {senderId, token} = req.body
  let reciverId = JWT.decode(token)
  // console.log(senderId)
  // console.log(reciverId)
  await Friends.create({
    me: senderId,
    myFriend: reciverId,
  })
  await Friends.create({
    me: reciverId,
    myFriend: senderId,
  })
  await Notification.create({
    senderId: reciverId,
    reciverId: senderId,
    type: 'friend',
    message: 'is your friend now.',
  })
  res.send({
    success: true,
  })
})

router.delete('/:friendId', async (req, res)=>{
  let idObj = JWT.decode(req.headers.authorization)
  //  idObj._id
  await Friends.deleteMany({$and: [{me:idObj._id},{myFriend:req.params.friendId}]})
  await Friends.deleteMany({$and: [{me:req.params.friendId},{myFriend:idObj._id}]})
  res.send({
    success: true,
  })
})

module.exports = router