import * as YUP from 'yup'

const LoginValidation = YUP.object({
  email: YUP.string().email().required('Please enter your registerd email id.'),
  password: YUP.string().required('Please enter your password.'),
})

export default LoginValidation