import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../Helpers/Paths'
import FriendRequestCard from './FriendRequestCard'
import SryNotFound from '../../../../Components/ChildProp/SryNotFound'
import ToastSuccess from '../../../../Components/ChildProp/ToastSuccess'
import ToastDanger from '../../../../Components/ChildProp/ToastDanger'

const FriendRequest = () => {
  const componentName = 'Friend Requests'
  let [friendRequestList, setFriendRequestList] = useState([])
  let [showSuccessToast, setShowSuccessToast] = useState(false)
  let [showDangerToast, setShowDangerToast] = useState(false)
  let token = localStorage.getItem('access-user')
  useEffect(() => {
    axios.get(`${API_URL}/friendRequest`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
      .then(Response => {
        // console.log(Response.data)
        setFriendRequestList(Response.data)
      })
  }, [])
  const successToastHandler = () => {
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
    }, 2000);
  }
  const dangerToastHandler = () => {
    setShowDangerToast(true)
    setTimeout(() => {
      setShowDangerToast(false)
    }, 2000);
  }
  let acceptRequestHandle = async (senderId) => {
    console.log('***********')
    let token = localStorage.getItem('access-user')
    await axios.post(`${API_URL}/friends`, {
      senderId: senderId,
      token: localStorage.getItem('access-user'),
    })
    await axios.delete(`${API_URL}/friendrequest/${senderId}`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    setFriendRequestList(friendRequestList.filter(item => senderId != item.sender._id))
    successToastHandler()
  }

  let declinerequestHandle = (senderId) => {

    axios.delete(`${API_URL}/friendrequest/${senderId}`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
      .then(Response => {
        // console.log(Response.data)
        axios.get(`${API_URL}/notification`, {
          headers: {
            Authorization: localStorage.getItem('access-user')
          }
        })
          .then(Response => {
            // console.log(Response.data)
            setFriendRequestList(Response.data)
          })
      })
    dangerToastHandler()
  }
  return <>
    <div className="container mx-auto">


      {
        friendRequestList.length
          ?
          <div className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <div className="text-left">
              <h3 className="whitespace-nowrap px-4 py-2 text-2xl text-gray-900">You have friend request from</h3>
            </div>
            <ul className="md:w-1/3">
              {
                friendRequestList.map(NotificationItem => <FriendRequestCard
                  NotificationItem={NotificationItem}
                  acceptRequestHandle={acceptRequestHandle}
                  declinerequestHandle={declinerequestHandle}
                />)
              }
            </ul>
          </div>
          :
          <SryNotFound cpName={componentName} />
      }


    </div>
    {
      showSuccessToast
        ?
        <ToastSuccess message={'Added to friend list.'} setShowToast={setShowSuccessToast} />
        :
        showDangerToast
        &&
        <ToastDanger message={'Friend request declined.'} setShowToast={setShowDangerToast} />
    }
  </>
}

export default FriendRequest