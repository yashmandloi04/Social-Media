import * as YUP from 'yup'

const CommentValidation = YUP.object({
  message: YUP.string().required('First Write some text over here.'),
})

export default CommentValidation