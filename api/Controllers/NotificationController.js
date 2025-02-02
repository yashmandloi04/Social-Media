const router = require('express').Router()
const JWT = require('jsonwebtoken')
const Notification = require('../Models/NotificationModel')
const User = require('../Models/UserModel')

router.get('/', async (req, res)=>{
  let records = await Notification.find().populate('reciverId').populate('senderId').exec()
  res.send(records)
})
router.get('/', async (req, res)=>{
  let userId = JWT.decode(req.headers.authorization)
  let records = await Notification.find({'reciverId': userId._id}).sort({created_at: -1}).populate('senderId').exec()
  res.send(records)
})
router.post('/', async (req, res)=>{
  let userId = JWT.decode(req.headers.authorization)
  req.body.senderId = userId._id
  let records = await Notification.create(req.body)
  res.send(records)
})

module.exports = router