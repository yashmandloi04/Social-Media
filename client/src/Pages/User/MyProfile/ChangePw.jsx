import axios from 'axios'
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { API_URL } from '../../../Helpers/Paths'
import ToastSuccess from '../../../Components/ChildProp/ToastSuccess'
import EditPwValidation from '../../../Schemas/ChangePwValidation'

const ChangePw = () => {
  let [changeStatus, setChangeStatus] = useState('')
  let [showToast, setShowToast] = useState(false)
  let curPwField = useRef('')
  let pwField = useRef('')
  let rePwField = useRef('')
  const successToastHandler = ()=>{
    setShowToast(true)
    setTimeout(()=>{
      setShowToast(false)
    }, 2000)
  }
  let ChanPwFrm = useFormik({
    validationSchema: EditPwValidation,
    initialValues: {
      curPw: '',
      password: '',
      rePassword: '',
    },
    onSubmit: async (FrmData)=>{
      let response = await axios.put(`${API_URL}/myprofile/changepw`, FrmData, {
        headers: {
          Authorization: localStorage.getItem('access-user')
        }
      })
      if(response.data.success){
        successToastHandler()
        setChangeStatus('')
        curPwField.current.value = ''
        pwField.current.value = ''
        rePwField.current.value = ''     
      }else{
        setChangeStatus('Invalid current password')
      }
    }
  })
  return <>
    <div className="flex w-2/5 justify-center mx-auto">
  <section className="p-6 bg-white text-lg text-gray-900 w-full">
    <form onSubmit={ChanPwFrm.handleSubmit} className="flex flex-col space-y-6">
      <fieldset className="flex flex-col p-6 rounded-lg shadow-lg bg-gray-50 space-y-6">
        {/* Form Fields */}

        {/* old pw */}
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-md font-medium text-gray-700">Current Password</label>
          <input
            id="curPw"
            onChange={ChanPwFrm.handleChange}
            name='curPw'
            ref={curPwField}
            type="password"
            placeholder="Enter your current password."
            className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
          />
          {ChanPwFrm.errors.curPw && ChanPwFrm.touched.curPw && <small className='text-red-500'>{ChanPwFrm.errors.curPw}</small>}
        </div>
   
        {/* pw */}
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-md font-medium text-gray-700">New Password</label>
          <input
            id="newPw"
            onChange={ChanPwFrm.handleChange}
            name='password'
            ref={pwField}
            type="password"
            placeholder="Enter your new password."
            className={`w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 ${ChanPwFrm.errors.password && ChanPwFrm.touched.password && 'border-red-500'}`}
          />
          {ChanPwFrm.errors.password && ChanPwFrm.touched.password && <small className='text-red-500'>{ChanPwFrm.errors.password}</small>}
        </div>

        {/* new pw */}
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-md font-medium text-gray-700">Confirm New Password</label>
          <input
            id="rePw"
            onChange={ChanPwFrm.handleChange}
            name='rePassword'
            ref={rePwField}
            type="password"
            placeholder="Re Enter your new password."
            className={`w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 ${ChanPwFrm.errors.rePassword && ChanPwFrm.touched.rePassword && 'border-red-500'}`}
          />
          {ChanPwFrm.errors.rePassword && ChanPwFrm.touched.rePassword && <small className='text-red-500'>{ChanPwFrm.errors.rePassword}</small>}
        </div>

   
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type='Submit'
            className="text-white text-md bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
          >
            Change
          </button>
        </div>
        <small className='text-center text-red-500'>{changeStatus}</small>
      </fieldset>
    </form>
  </section>
</div>
{
  showToast
  &&
  <ToastSuccess message={'Password changed successfully.'} setShowToast={setShowToast} />
}
  </>
}

export default ChangePw