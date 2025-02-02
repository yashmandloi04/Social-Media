import * as YUP from 'yup'

const PostValidation = YUP.object({
  image: YUP.string().test('checkImgExt', 'Image must have one these extentions(.webp | .jpg | .jpeg | .png)', (imageName)=>{
    let temp = imageName.split('.')
    let ext = temp[temp.length - 1]
    if(ext == 'webp' || ext == 'jpg' || ext == 'jpeg' || ext == 'png'){
      return true
    }else{
      return false
    }
  }).required('Image for post is required.'),
})

export default PostValidation