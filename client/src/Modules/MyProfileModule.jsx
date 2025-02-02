import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

const MyProfileModule = () => {
  let [profileNavList, setProfileNavList] = useState([
    {
      name:'Profile',
      href:'/myprofile',
      iconName:'CgProfile',
    },
    {
      name:'Edit',
      href:'/myprofile/edit',
      iconName:'FaEdit',
    },
    {
      name:'Change Password',
      href:'/myprofile/chanpw',
      iconName:'FaKey',
    },
  ])
  return (
    <div className='flex'>
      <Sidebar navList={profileNavList} />
    <Outlet />
    </div>
  )
}

export default MyProfileModule