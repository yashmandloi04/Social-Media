import * as YUP from 'yup'

const EditPwValidation = YUP.object({
  curPw: YUP.string().required('Your current password is required.'),
  password: YUP.string().required('Enter new password.'),
  rePassword: YUP.string().oneOf([YUP.ref('password')], 'Re-Password and new password must be same.').required('Re-enter new password.'),
})

export default EditPwValidation