const router = require('express').Router();
const User = require('../Models/UserModel')
const Myprofile = require('../Models/MyProfileModel')
const shaz = require('sha1')
const random = require('random-string-generator');
const path = require('path')

router.post('/', async (req, res)=>{
  let image = req.files.image
  let temp = image.name.split('.')
  let newName = random('alphanumeric')+'.'+temp[temp.length - 1]
  let imgPath = `${path.resolve()}/assets/profile-images/${newName}`
  await image.mv(imgPath, (err)=>{
    if(err)
      console.log(err)
  })
  req.body.image = newName
  delete req.body.password_confirmation
  delete req.body.marketing_accept
  req.body.password = shaz(req.body.password)
  let user = await User.create(req.body);
  await Myprofile.create({
    userId: user._id
  })
  res.send({
    success: true,
  })
})

router.get('/:email', async (req, res)=>{
  let record = await User.find({email: req.params.email})
  if(record.length){
    res.send(false)
  }else{
    res.send(true)
  }
})

module.exports = router