const router = require('express').Router();
const Myprofile = require('../Models/MyProfileModel')
const User = require('../Models/UserModel')
const JWT = require('jsonwebtoken')
const random = require('random-string-generator');
const path = require('path')
const shaz = require('sha1')

router.get('/', async (req, res) => {
  let objSent = JWT.decode(req.headers.authorization)
  let profileData = await Myprofile.find({ userId: objSent._id }).populate('userId').exec()
  res.send(profileData)
})
router.post('/', async (req, res) => {
  let objSent = JWT.decode(req.headers.authorization)
  let profileData = await Myprofile.create({ userId: objSent._id }, req.body)
  res.send(profileData)
})
router.put('/', async (req, res) => {
  let proImgName;
  if (req.files) {
    if(req.files.bg_image){
      let image = req.files.bg_image
      let temp = image.name.split('.')
      let newName = random('alphanumeric') + '.' + temp[temp.length - 1]
      let imgPath = `${path.resolve()}/assets/profile-images/${newName}`
      await image.mv(imgPath, (err) => {
        if (err)
          console.log(err)
      })
      req.body.bg_image = newName
    }
    if(req.files.pro_image){
      let image = req.files.pro_image
      let temp = image.name.split('.')
      proImgName = random('alphanumeric') + '.' + temp[temp.length - 1]
      let imgPath = `${path.resolve()}/assets/profile-images/${proImgName}`
      await image.mv(imgPath, (err) => {
        if (err)
          console.log(err)
      })
    }
    
  }
  let objSent = JWT.decode(req.headers.authorization)
  let profileData = await Myprofile.updateMany({ userId: objSent._id }, req.body)
  let userIdData = await User.updateMany({ _id: objSent._id }, {
    name:req.body.userName,
    image:proImgName,
  })
  res.send(profileData)
})

router.put('/changepw', async (req, res)=>{
  let objSent = JWT.decode(req.headers.authorization)
  let user = await User.findOne({_id: objSent._id})
  if(user.password == shaz(req.body.curPw)){
    await User.updateMany({_id: objSent._id}, {
      password: shaz(req.body.password),
    })
    res.send({
      success: true,
    })
  }else{
    res.send({
      success: false,
      errorType: 1,
    })
  }
})

router.delete('/', async (req, res) => {
  let objSent = JWT.decode(req.headers.authorization)
  let profileData = await Myprofile.deleteMany({ userId: objSent._id })
  res.send(profileData)
})

module.exports = router;