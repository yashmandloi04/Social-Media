import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

const FriendModule = () => {
    let [friendNavList, setFriendNavList] = useState([
        {
          name:'All Friend',
          href:'/friend',
          iconName:'FaUserFriends',
        },
        {
          name:'Friend Request',
          href:'/friend/friendrequest',
          iconName:'TiUserAdd',
        },
        {
          name:'All Users',
          href:'/friend/allusers',
          iconName:'FaUsers',
        },
      ])
  return (
      <div className='flex'>
      <Sidebar navList={friendNavList} />
      <Outlet />
    </div>
  )
}

export default FriendModule