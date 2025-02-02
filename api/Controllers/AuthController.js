const router = require('express').Router();
const User = require('../Models/UserModel')
const shaz = require('sha1')
const JWT = require('jsonwebtoken')

router.post('/', async (req, res)=>{
  let record  = await User.find({email: req.body.email})
  if(record.length){
    let enterdPw = await shaz(req.body.password)
    if(record[0].password === enterdPw){
      let token = JWT.sign({
        _id: record[0]._id,
      },'9FD65CC996BB6E9487A2F2632E29F')
      res.send({
        success: true,
        token,
        name: record[0].name,
        profileImg: record[0].image,
      })
    }else{
      res.send({
        success: false,
        errorType: 2,
      })
    }
  }else{
    res.send({
      success: false,
      errorType: 1,
    })
  }
})

module.exports = router;