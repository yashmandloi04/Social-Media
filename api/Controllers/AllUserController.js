const router = require('express').Router();
const User = require('../Models/UserModel')
const Friends = require('../Models/FriendsModel')
const FriendRequest = require('../Models/FriendRequestModel')
const JWT = require('jsonwebtoken')

router.get('/', async (req, res) => {
  let objSent = JWT.decode(req.headers.authorization)
  // console.log(objSent)
  let response1 = await Friends.find({ me: objSent._id }).distinct('myFriend')
  let response2 = await FriendRequest.find({ sender: objSent._id }).distinct('reciver')
  let RequiredUsers = await User.find({ $and: [{ '_id': { $ne: objSent._id } }, { '_id': { $nin: response1 } }, { '_id': { $nin: response2 } }] })
  res.send(RequiredUsers)
})

module.exports = router;