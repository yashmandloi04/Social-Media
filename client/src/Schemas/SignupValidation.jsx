import axios from 'axios'
import * as YUP from 'yup'
import { API_URL } from '../Helpers/Paths'

const SignupValidation = YUP.object().shape({
  name: YUP.string().required('Please enter your name.'),
  email: YUP.string().email('Enter valid email id.').test('checkUniqueEmail', 'Email already been registerd.', async (emailEnterd) => {
    let isEmailUnique = await axios.get(`${API_URL}/signup/${emailEnterd}`)
    return isEmailUnique.data
  }).required('Please enter your email.'),
  password: YUP.string().required('Please enter your password.'),
  password_confirmation: YUP.string().oneOf([YUP.ref('password')], 'Does not match with password.').required('Please re-enter your password.'),
  marketing_accept: YUP.boolean().oneOf([true], 'Must Accept Terms and Conditions').required('You need to accept the terms and conditions'),
  image: YUP.string().test('checkImgExt', 'Image must have one these extentions(.webp | .jpg | .jpeg | .png)', (imageName) => {
    let temp = imageName.split('.')
    let ext = temp[temp.length - 1]
    if (ext == 'webp' || ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
      return true
    } else {
      return false
    }
  }).required('Please upload profile photo.')
  // city: YUP.string().required('Please select your city.'),
})

export default SignupValidation