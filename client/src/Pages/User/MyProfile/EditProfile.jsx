import React, { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { API_PATH, API_URL } from '../../../Helpers/Paths'
import ToastSuccess from '../../../Components/ChildProp/ToastSuccess'

const EditProfile = () => {
  let [userProfile, setUserProfile] = useState({})
  let [showToast, setShowToast] = useState(false)
  let bgImageField = useRef('')
  let proImageField = useRef('')
  useEffect(() => {
    getProfileData()
  }, [])
  const getProfileData = async () => {
    let response = await axios.get(`${API_URL}/myprofile`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    console.log(response.data[0])
    setUserProfile(response.data[0])
  }
  const successToastHandler = ()=>{
    setShowToast(true)
    setTimeout(()=>{
      setShowToast(false)
    }, 2000)
  }
  let EditFrm = useFormik({
    initialValues: userProfile,
    onSubmit: async (FrmData) => {
      let form = new FormData()
      if (bgImageField.current.files[0] || proImageField.current.files[0]) {
        if(proImageField.current.files[0]){
          let image = proImageField.current.files[0]
          form.append('pro_image', image)
        }
        if(bgImageField.current.files[0]){
          let image = bgImageField.current.files[0]
          form.append('bg_image', image)

        }
        form.append('friends', FrmData.friends)
        form.append('bio', FrmData.bio)
        form.append('userId', FrmData.userId._id)
        form.append('userName', FrmData.userId.name)
        let response = await axios.put(`${API_URL}/myprofile`, form, {
          headers: {
            Authorization: localStorage.getItem('access-user')
          }
        })
      }else{
        let response = await axios.put(`${API_URL}/myprofile`, FrmData, {
          headers: {
            Authorization: localStorage.getItem('access-user')
          }
        })
      }
      successToastHandler()
    },
    enableReinitialize: true,
  })
  return <>
    <div className="flex w-2/5 justify-center mx-auto">
    <section className="p-6 bg-white text-lg text-gray-900 w-full">
      <form onSubmit={EditFrm.handleSubmit} className="flex flex-col space-y-10">
        <fieldset className="flex flex-col p-6 rounded-lg shadow-lg bg-gray-50 space-y-6">
          {/* Form Fields */}

          {/* Bg Image */}
          <label htmlFor='bgImg' className="text-md font-medium text-gray-700">Profile Background</label>
          <div>
            {
              EditFrm.values.bg_image
              ?
              <img src={`${API_PATH}/profile-images/${EditFrm.values.bg_image}`} alt="Background Image" />
              :
              'No background Image Uploaded.'
            }
          </div>
          <div id='bgImg' className="flex flex-col">
            <input type='file' ref={bgImageField} 
            // value={EditFrm.values.bg_image} 
            onChange={EditFrm.handleChange} name='bg_image' />
          </div>

          {/* Profile Image */}
          <label htmlFor='proImg' className="text-md font-medium text-gray-700">Profile Avtar</label>
          <div>
            <img src={`${API_PATH}/profile-images/${EditFrm.values.userId && EditFrm.values.userId.image}`} alt="Background Image" />
          </div>
          <div id='proImg' className="flex flex-col">
            <input type='file' ref={proImageField} 
            // value={EditFrm.values.userId && EditFrm.values.userId.image} 
            onChange={EditFrm.handleChange} name='userId.image' />
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-md font-medium text-gray-700">Name</label>
            <input
              id="name"
              value={EditFrm.values.userId && EditFrm.values.userId.name}
              onChange={EditFrm.handleChange}
              name='userId.name'
              // name='userId.name'
              // ref={titleField}
              type="text"
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
            />
          </div>

          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-md font-medium text-gray-700">Email</label>
            <input
              id="email"
              value={EditFrm.values.userId && EditFrm.values.userId.email}
              onChange={EditFrm.handleChange}
              name='userId.email'
              disabled
              // ref={titleField}
              type="text"
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 cursor-not-allowed"
            />
          </div>



          {/* Bio */}
          <div className="flex flex-col">
            <label htmlFor="lastname" className="text-md font-medium text-gray-700">Body</label>
            <textarea
              id="bio"
              value={EditFrm.values.bio}
              onChange={EditFrm.handleChange}
              name='bio'
              type="text"
              placeholder="Set bio for your profile..."
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type='Submit'
              className="text-white text-md bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              Edit
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  </div>
  {
    showToast
    &&
    <ToastSuccess message={'Edited profile successfully.'} setShowToast={setShowToast} />
  }
  </>
}

export default EditProfile