import React, { useEffect, useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaShare } from "react-icons/fa6";
import Comment from '../Comment/Comment';
import { API_PATH } from '../../Helpers/Paths';

const PostCard = ({ post, likePostHandler, dislikePostHandler }) => {
  let [showComment, setShowComment] = useState('hide')
  let [comLength, setComLength] = useState(post.reaction.comment.commentList.length)
  const commentHandler = () => {
    if (showComment === 'hide') {
      setShowComment('show')
    } else {
      setShowComment('hide')
    }
  }
  const incComCount = () => {
    setComLength(++comLength)
  }
  return <div className="w-full md:w-2/5 mx-auto my-10 bg-white rounded-lg shadow">
    {/* Post Header */}
    <div className="flex items-center p-4 border-b">
      {/* Profile Picture */}
      <img
        src={`${API_PATH}/profile-images/${post.userId.image}`}
        alt="User Profile"
        className="w-12 h-12 rounded-full mr-3 object-cover"
      />
      {/* User Info */}
      <div>
        <h6 className="text-base font-semibold">{post.userId.name}</h6>
        <small className="text-gray-500">{post.title}</small>
      </div>
      {/* Options Button */}
      <button className="ml-auto p-2 text-gray-500 hover:text-gray-700">
        <i className="bi bi-three-dots text-xl"></i>
      </button>
    </div>

    {/* Post Body */}
    <div className="p-4">
      <p className="mb-3 text-gray-800">
        {post.body}
      </p>
      <img
        src={`${API_PATH}/post-images/${post.image}`}
        alt="Post Content"
        className="w-full rounded object-cover"
      />
    </div>
    <div className="space-x-2 text-lg">{
      (post.tags).map(tag => <span
        key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{`#${tag}`}
      </span>
      )
    }</div>

    {/* Post Actions */}
    <div className="flex justify-around items-center py-3 border-t">
      {/* Like Button */}
      <div className='flex flex-col items-center justify-center'>
        <button onClick={() => {
          (
            post.reaction.like.likeStatus
              ?
              dislikePostHandler(post)
              :
              likePostHandler(post)
          )
        }} className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
          <span><AiFillLike size={25} className={`hover:transition hover:scale-125 hover:text-red-500 ${post.reaction.like.likeStatus ? 'text-red-600' : 'text-gray-500'
            }`} /></span>
        </button>
        <small className='ml-2'>{post.reaction.like.likeCount} Likes</small>
      </div>
      {/* Comment Button */}
      <div className='flex flex-col items-center justify-center'>
        <button
          className="flex flex-col items-center space-x-2 text-gray-600"
          onClick={commentHandler}
        >
          <span><MdOutlineInsertComment size={25} className={`hover:transition hover:scale-125 hover:text-red-600`} /></span>
        </button>
        <small className='ml-2'>{comLength} Comments</small>
      </div>

      {/* Share Button */}
      <div className='flex flex-col items-center justify-center'>
        <button className="flex flex-col items-center space-x-2 text-gray-600">
          <span><FaShare size={25} className={`hover:transition hover:scale-125 hover:text-red-600`} /></span>
        </button>
        <small className='ml-2'>0 Share</small>
      </div>
    </div>

    {/* Comment Section */}
    {
      showComment === 'show'
      &&
      <Comment post={post} postId={post._id} incComCount={incComCount} />
    }
  </div>
}

export default PostCard