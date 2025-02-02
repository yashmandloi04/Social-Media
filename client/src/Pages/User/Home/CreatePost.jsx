import axios from 'axios'
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { API_URL } from '../../../Helpers/Paths'
import ToastSuccess from '../../../Components/ChildProp/ToastSuccess'
import PostValidation from '../../../Schemas/PostValidation'

const CreatePost = () => {
  let [showSuccessToast, setShowSuccessToast] = useState(false)
  let imageField = useRef('')
  let titleField = useRef('')
  let bodyField = useRef('')
  let tagField = useRef('')
  const successToasthandler = () => {
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
    }, 2000);
  }
  const PostFrm = useFormik({
    validationSchema: PostValidation,
    initialValues: {
      title: '',
      body: '',
      tags: [],
      image: '',
    },
    onSubmit: async (PostFrm) => {
      try {
        let postImage = imageField.current.files[0]
        let form = new FormData()
        form.append('image', postImage)
        form.append('title', PostFrm.title)
        form.append('body', PostFrm.body)
        form.append('tags', PostFrm.tags)
        let response = await axios.post(`${API_URL}/post`, form, {
          headers: {
            Authorization: localStorage.getItem('access-user'),
          }
        })
        imageField.current.value = ''
        titleField.current.value = ''
        bodyField.current.value = ''
        tagField.current.value = ''
        successToasthandler()
      } catch (error) {
        console.log(error)
      }
    }
  })
  return <>
    <div className="flex w-2/5 justify-center mx-auto">
      <section className="p-6 bg-white text-lg text-gray-900 w-full">
        <form onSubmit={PostFrm.handleSubmit} className="flex flex-col space-y-6">
          <fieldset className="flex flex-col p-6 rounded-lg shadow-lg bg-gray-50 space-y-6">
            {/* Form Fields */}
            {/* Post Image */}
            <div className="flex flex-col">
              <input type='file' ref={imageField} onChange={PostFrm.handleChange} name='image' className={`p-0 rounded-md ${PostFrm.errors.image && PostFrm.touched.image && ' border-red-500'}`} />
              {PostFrm.errors.image && PostFrm.touched.image && <small className='text-red-500'>{PostFrm.errors.image}</small>}
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="firstname" className="text-md font-medium text-gray-700">Title</label>
              <input
                id="title"
                onChange={PostFrm.handleChange}
                name='title'
                ref={titleField}
                type="text"
                placeholder="How you feel today ?"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
              />
            </div>

            {/* Body */}
            <div className="flex flex-col">
              <label htmlFor="lastname" className="text-md font-medium text-gray-700">Body</label>
              <textarea
                id="body"
                onChange={PostFrm.handleChange}
                name='body'
                ref={bodyField}
                type="text"
                placeholder="Describe your post."
                className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
              ></textarea>
            </div>

            {/* Tags */}
            <div className="flex flex-col">
              <label htmlFor="text" className="text-md font-medium text-gray-700">Tags</label>
              <input
                id="tags"
                onChange={PostFrm.handleChange}
                name='tags'
                ref={tagField}
                type="text"
                placeholder="Enter tags by giving space in between."
                className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type='Submit'
                className="text-white text-md bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
              >
                Post
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
    {
      showSuccessToast
      &&
      <ToastSuccess message={'Post created successfully.'} setShowToast={setShowSuccessToast} />
    }
  </>

}

export default CreatePost