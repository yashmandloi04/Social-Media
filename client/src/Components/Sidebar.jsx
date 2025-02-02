import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_PATH, API_URL } from '../Helpers/Paths'
import { NavLink } from 'react-router-dom'
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { MdHomeFilled } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

const Sidebar = ({ navList }) => {
  let [userData, setUserData] = useState({})
  useEffect(() => {
    let token = localStorage.getItem('access-user')
    axios.get(`${API_URL}/myprofile`,{
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
      .then(Response => {
        setUserData(Response.data[0])
      })
  }, [])
  const getIconFromName = (iconName)=>{
    switch(iconName){
      case 'FaUserFriends':
        return <FaUserFriends size={20} />
      case 'FaUsers':
        return <FaUsers size={20} />
      case 'TiUserAdd':
        return <TiUserAdd size={20} />
      case 'MdHomeFilled':
        return <MdHomeFilled size={20} />
      case 'MdPostAdd':
        return <MdPostAdd size={20} />
      case 'CgProfile':
        return <CgProfile size={20} />
      case 'FaEdit':
        return <FaEdit size={20} />
      case 'FaKey':
        return <FaKey size={20} />
    }
  }
  return (
    <>
      <div>
        <nav className="flex flex-col bg-white w-64 h-screen px-4 border-r border-gray-200">
          {/* Profile Section */}
          <div className="flex flex-wrap mt-8 justify-center items-center">
            <img
              src={`${API_PATH}/profile-images/${userData.userId && userData.userId.image}`}
              alt="User"
              className="w-20 h-20 rounded-full border-2 border-primary-700 object-cover"
            />
            <span className="my-4 mb-8 mx-3 text-gray-800 font-semibold text-2xl capitalize">{localStorage.getItem('fullname')}</span>
          </div>

          {/* Navigation Links */}
          <div className="mt-10 mb-4">
            <ul className="space-y-2">
             {
              navList.map((element, index) => <li
              key={index}
              >
                <a
                  href={element.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-700 font-medium rounded-lg transition duration-300"
                >
                  {/* <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                4h4v-4h-4M4 8h4V4H4v4z"
                    ></path>
                  </svg> */}
                  <span>{getIconFromName(element.iconName)}</span>
                  <span className="ml-3">{element.name}</span>
                </a>
              </li>)
             }
            </ul>
          </div>
        </nav>
      </div>

    </>
  )
}

export default Sidebar