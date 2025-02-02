import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { MdHomeFilled } from "react-icons/md";

const HomeModule = () => {
  let [homeNavList, setHomeNavList] = useState([
    {
      name:'Home',
      href:'/home',
      iconName:'MdHomeFilled',
    },
    {
      name:'Create Post',
      href:'/home/createpost',
      iconName:'MdPostAdd',
    },
  ])
  return (
    <div className='flex'>
      <Sidebar navList={homeNavList} />
      <Outlet />
    </div>
  )
}

export default HomeModule