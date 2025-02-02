const router = require('express').Router()
const Post = require('../Models/PostModel')
const Friends = require('../Models/FriendsModel')
const JWT = require('jsonwebtoken')
const path = require('path')
const random = require('random-string-generator')

router.get('/', async (req, res)=>{
  let token = req.headers.authorization
  let objId = JWT.decode(token , process.env.ACCESS_TOKEN_SECRET)
  let userFriendsIdList = await Friends.find({me: objId}).distinct('myFriend')
  let userPost = await Post.find({$or:[{ userId: objId._id }, { userId: { $in: userFriendsIdList }}]}).sort({created_at:-1}).populate('userId').exec()

  let finalResponse = await Promise.all(userPost.map(async (post)=>{
    let response = await Post.findOne(
      {
      _id: post._id,
      'reaction.like.likeList.userId': objId._id,
    },
    { 'reaction.like.likeList.$': 1 }
  )
    if(response){
      // console.log(post.reaction)
      if(response.reaction.like.likeList[0].status == 'like'){
        post.reaction.like.likeStatus = true
      }else{
        post.reaction.like.likeStatus = false
      }
    }else{
      post.reaction.like.likeStatus = false
    }
    return post
  }))
  // console.log(finalResponse[0].reaction.like)
  res.send(finalResponse)
})
router.get('/:id', async (req, res)=>{
  let response = await Post.find({_id:req.params.id})
  res.send(response)
})
router.post('/', async (req, res)=>{
  // random('alphanumeric')
  // return
  let image = req.files.image
  let temp = image.name.split('.')
  let newImgName = random('alphanumeric')+'.'+temp[(temp.length - 1)]
  let imgPath = `${path.resolve()}/assets/post-images/${newImgName}`
  await image.mv(imgPath, (err)=>{
    if(err)
      console.log('An error occured...'+err)
  })
  let postNewObj = {}
  let token = req.headers.authorization
  let objId = JWT.decode(token, process.env.ACCESS_TOKEN_SECRET)
  postNewObj = {
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags.split(' '),
    userId: objId._id,
    reaction: {
      like: {
        likeList: [],
        likeCount: 0,
      },
    },
    image: newImgName
  }
  req.body = postNewObj
  let response = await Post.create(req.body)
  res.send(response)
})
router.put('/:id', async (req, res)=>{
  let response = await Post.updateMany({_id:req.params.id}, req.body)
  res.send(response)
})
router.delete('/:id', async (req, res)=>{
  let response = await Post.deleteMany({_id:req.params.id})
  res.send(response)
})

module.exports = router