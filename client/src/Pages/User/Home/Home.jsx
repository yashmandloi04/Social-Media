import React, { useEffect, useState } from 'react'
import PostCard from '../../../Components/Post/PostCard'
import { API_URL } from '../../../Helpers/Paths'
import axios from 'axios'
import SryNotFound from '../../../Components/ChildProp/SryNotFound'


const Home = () => {
  const componentName = 'Posts'
  let [postList, setPostList] = useState([])
  useEffect(() => {
    getAllPost()
  }, [])
  const getAllPost = async () => {
    let response = await axios.get(`${API_URL}/post`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    console.log(response.data)
    setPostList(response.data)
  }
  const likePostHandler = async (post) => {
    let response = await axios.put(`${API_URL}/like/${post._id}`, {
      method: 'like'
    }, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    if (response.request.status == 200) {
      setPostList(() => {
        return postList.map(mapPost => {
          if (mapPost._id == post._id) {
            let likeList = mapPost.reaction.like.likeList
            let likeCount = (mapPost.reaction.like.likeCount + 1)
            let newComment = mapPost.reaction.comment
            return {
              ...mapPost, reaction: {
                like: {
                  likeCount,
                  likeList,
                  likeStatus: true,
                },
                comment: newComment,
              }
            }
          }
          return mapPost
        })
      })
    }
  }
  const dislikePostHandler = async (post) => {
    let response = await axios.put(`${API_URL}/like/${post._id}`, {
      method: 'dislike'
    }, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    if (response.request.status == 200) {
      setPostList(() => {
        return postList.map(mapPost => {
          if (mapPost._id == post._id) {
            let likeList = mapPost.reaction.like.likeList
            let likeCount = (mapPost.reaction.like.likeCount - 1)
            let newComment = mapPost.reaction.comment
            return {
              ...mapPost, 
              reaction: {
                like: {
                  likeCount,
                  likeList,
                  likeStatus: false,
                },
                comment: newComment,
              }
            }
          }
          return mapPost
        })
      })
    }
  }
  return (
    <>
      {
        postList.length
        ?
        <div className='w-full flex flex-col'>
        {
          postList.map(post => <PostCard
            key={post._id}
            post={post}
            likePostHandler={likePostHandler}
            dislikePostHandler={dislikePostHandler}
          />)
        }
      </div>
      :
      <SryNotFound cpName={componentName} />
      }
    </>
  )
}
export default Home