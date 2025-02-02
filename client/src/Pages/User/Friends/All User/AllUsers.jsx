import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../Helpers/Paths'
import AllUserItem from './AllUsersItem'
import ToastSuccess from '../../../../Components/ChildProp/ToastSuccess'

const AllUsers = () => {
  let [allUser, setAllUser] = useState([])
  let [showSuccessToast, setShowSuccessToast] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    let token = localStorage.getItem('access-user')
    axios.get(`${API_URL}/allusers`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
      .then(Response => {
        setIsLoading(false)
        setAllUser(Response.data)
      })
  }, [])
  const successToastHandler = () => {
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
    }, 2000);
  }
  let addFriendHandler = async (reciverId) => {
    let token = localStorage.getItem('access-user')
    let response = await axios.post(`${API_URL}/friendrequest`, {
      token,
      reciverId,
    })
    successToastHandler()
    if (response.request.status === 200) {
      setAllUser(() => {
        return allUser.filter(mapUser => {
          if (mapUser._id != reciverId) {
            return mapUser
          }
        })
      })
    }
  }

  return <>
    <ul className='w-1/3'>
      {
        allUser.map(userItem => <AllUserItem
          userItem={userItem}
          key={userItem._id}
          addFriendHandler={addFriendHandler}
        />)
      }
    </ul>
    {
      showSuccessToast
      &&
      <ToastSuccess message={'Friend request sent.'} setShowToast={setShowSuccessToast} />
    }
  </>

}

export default AllUsers