import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";

const SryNotFound = ({ cpName, }) => {
  return (
    <div className="container">
      <div className="p-10 space-y-3 flex flex-col justify-center items-center">
        <h1 className='text-3xl'>Oops, no {cpName} !!</h1>
        <h3 className='flex'>Start making new friends over here <NavLink to={`/friend/allusers`} className={'px-3'}><FaHeart size={25} className='animate-bounce text-red-600' /></NavLink></h3>
      </div>
    </div>
  )
}

export default SryNotFound