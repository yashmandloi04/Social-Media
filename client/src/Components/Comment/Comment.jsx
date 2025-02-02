import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { API_PATH, API_URL } from '../../Helpers/Paths'
import { IoMdSend } from "react-icons/io";
import CommentValidation from '../../Schemas/CommentValidation';

const Comment = ({ post, postId, incComCount }) => {
  let [commentList, setCommentList] = useState([])
  let comField = useRef('')
  useEffect(() => {
    getAllComments(postId)
  }, [])
  const getAllComments = async (postId) => {
    let response = await axios.get(`${API_URL}/comment/${postId}`)
    console.log(response.data)
    let arr = response.data[0].reaction.comment.commentList
    setCommentList(() => {
      return arr.map((com => {
        return { ...com, userId: com.userId.name, proImg: com.userId.image, created_at: com.created_at }
      }))
    })
  }
  const commentHandler = async (FrmData) => {
    let response = await axios.put(`${API_URL}/comment/${postId}`, FrmData, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    if (response.request.status === 200) {
      let comObj = {
        userId: localStorage.getItem('fullname'),
        message: FrmData.message,
        created_at: Date(),
        proImg: localStorage.getItem('profile-image')
      }
      setCommentList([comObj, ...commentList])
      incComCount()
      comField.current.value = ''
    }
  }
  const CommentFrm = useFormik({
    validationSchema: CommentValidation,
    initialValues: {
      message: '',
    },
    onSubmit: (FrmData) => {
      commentHandler(FrmData)
    }
  })
  const getTimeAgo = (time) => {
    let hour = (new Date(time).getTime() - new Date().getTime()) / 1000 / 60 / 60;
    console.log('value of hour is ', hour.toFixed(6));

    if (Math.abs(hour) < 0) {
      console.log('FLOW ENTERED HERE');
      let min = hour * 60;
      if (Math.abs(min) < 1) {
        // If less than 1 minute, calculate seconds
        let sec = min * 60;
        return `${Math.abs(sec.toFixed(0))} Seconds ago`;
      } else {
        return `${Math.abs(min.toFixed(0))} Minutes ago`;
      }
    } else {
      if (Math.abs(hour) > 24) {
        let day = hour / 24
        if (Math.abs(day) > 30) {
          let month = day / 30
          if (Math.abs(month) > 11) {
            let year = month / 12
            return `${Math.abs(year).toFixed(0)} Years ago`;
          } else {
            return `${Math.abs(month).toFixed(0)} Months ago`;
          }

        } else {
          return `${Math.abs(day).toFixed(0)} Days ago`;
        }
      } else {
        return `${Math.abs(hour).toFixed(0)} Hours ago`;
      }
    }
  };

  return <div className="w-full p-4 space-y-4">
    {/* Comment Input */}
    <div className="w-full flex items-start mb-4">
      <img
        src={`${API_PATH}/profile-images/${localStorage.getItem('profile-image')}`}
        alt="User Profile"
        className="w-10 h-10 rounded-full mr-2 object-cover"
      />
      <form onSubmit={CommentFrm.handleSubmit} className="flex-1">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            ref={comField}
            onChange={CommentFrm.handleChange}
            name="message"
            className={`flex-1 w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-200 ${CommentFrm.errors.message && CommentFrm.touched.message && 'border-red-500'}`}
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            className="h-10 w-10 border-2 border-black hover:text-red-600 hover:border-red-600 rounded-full flex items-center justify-center"
          >
            <IoMdSend size={20} />
          </button>
        </div>
        {CommentFrm.errors.message && CommentFrm.touched.message && <small className='text-red-500'>{CommentFrm.errors.message}</small>}
      </form>
    </div>

    {/* Existing Comments */}
    {commentList.map((comment, index) => (
      <div key={index} className="w-full flex items-start">
        <img
          src={`${API_PATH}/profile-images/${comment.proImg}`}
          alt="User Profile"
          className="w-10 h-10 rounded-full mr-2 object-cover"
        />
        <div className="flex-1 bg-gray-100 p-3 rounded-lg">
          <strong>{comment.userId}</strong>
          <p className="text-sm text-gray-800 mb-1">{comment.message}</p>
          <small className="text-gray-500">{getTimeAgo(comment.created_at)}</small>
        </div>
      </div>
    ))}
  </div>
}

export default Comment