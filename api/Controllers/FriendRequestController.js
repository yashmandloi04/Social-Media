const router = require('express').Router()
const FriendsRequest = require('../Models/FriendRequestModel')
const JWT = require('jsonwebtoken')

router.get('/', async (req, res)=>{
  let userId = await JWT.decode(req.headers.authorization)
  let records = await FriendsRequest.find({'reciver': userId._id}).populate('sender')
  res.send(records)
})

router.post('/', async (req, res)=>{
  let { token, reciverId } = req.body
  let senderId = JWT.decode(token)
  await FriendsRequest.create({
    sender: senderId._id,
    reciver: reciverId,
  })
  res.send({
    success: true,
  })
})

router.delete('/:senderId', async (req, res)=>{
  let reciverId = JWT.decode(req.headers.authorization)
  let remainingRequests =  await FriendsRequest.deleteMany({$and: [ {sender: req.params.senderId},{reciver: reciverId._id} ]})
  res.send({
    success: true,
  })
  // res.send(remainingRequests)
})

module.exports = router