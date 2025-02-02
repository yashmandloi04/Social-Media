import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../../Helpers/Paths'
import FriendCard from '../../../../Components/User/FriendCard'
import AskDeleteModal from '../../../../Components/ChildProp/AskDeleteModal'
import SryNotFound from '../../../../Components/ChildProp/SryNotFound'
import ToastDanger from '../../../../Components/ChildProp/ToastDanger'

const Friend = () => {
  // let [friendList, setFriendList] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     profilePicture: "https://via.placeholder.com/100",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     profilePicture: "https://via.placeholder.com/100",
  //   },
  //   {
  //     id: 3,
  //     name: "Alice Johnson",
  //     email: "alice@example.com",
  //     profilePicture: "",
  //   },
  //   {
  //     id: 4,
  //     name: "Bob Brown",
  //     email: "bob@example.com",
  //     profilePicture: "",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     profilePicture: "https://via.placeholder.com/100",
  //   },
  //   {
  //     id: 3,
  //     name: "Alice Johnson",
  //     email: "alice@example.com",
  //     profilePicture: "",
  //   },
  //   {
  //     id: 4,
  //     name: "Bob Brown",
  //     email: "bob@example.com",
  //     profilePicture: "",
  //   },
  // ])
  let [friendList, setFriendList] = useState([])
  let [selectedFriend, setSelectedFriend] = useState({})
  let [showDangerToast, setShowDangerToast] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem('access-user')
  const componentNameFri = 'Un-Friend'
  const componentName = 'Fiends'
  useEffect(() => {
    getAllFriends()
  }, [])
  const dangerToastHandler = () => {
    setShowDangerToast(true)
    setTimeout(() => {
      setShowDangerToast(false)
    }, 2000);
  }
  const getAllFriends = async () => {
    let response = await axios.get(`${API_URL}/friends`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    setFriendList(response.data)
  }
  const askDeleteFriendHandler = (friend) => {
    setSelectedFriend(friend)
  }
  const confirmDeleteHandler = async () => {
    await axios.delete(`${API_URL}/friends/${selectedFriend.myFriend._id}`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    setFriendList(friendList.filter(friend => friend._id != selectedFriend._id))
    dangerToastHandler()
  }
  return (
    <>
      <AskDeleteModal
        cpName={componentNameFri}
        item={selectedFriend}
        confirmDeleteHandler={confirmDeleteHandler}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />

      {
        friendList.length
          ?
          <ul className='w-1/3'>
            {
              friendList.map(friend => <FriendCard
                key={friend._id}
                friend={friend}
                askDeleteFriendHandler={askDeleteFriendHandler}
                setModalOpen={setModalOpen}
              />)
            }
          </ul>
          :
          <SryNotFound cpName={componentName} />
      }
      {
        showDangerToast
        &&
        <ToastDanger message={'Removed from friend list.'} setShowToast={setShowDangerToast} />
      }
    </>
  )
}

export default Friend