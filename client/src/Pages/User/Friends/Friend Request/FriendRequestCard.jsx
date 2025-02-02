import React, { useEffect } from 'react'
import { API_PATH } from '../../../../Helpers/Paths'

const FriendRequestCard = ({ NotificationItem, acceptRequestHandle, declinerequestHandle }) => {
  useEffect(()=>{
    console.log(NotificationItem)
  }, [])
  return <li className="m-5 list-none">
  <div className="bg-white rounded-lg shadow-md p-6">
    {/* Profile Picture (Optional) */}
    {/* Uncomment and replace with a valid image source if needed */}
    <img
    className="w-20 h-20 rounded-full mb-4 shadow object-cover"
    src={`${API_PATH}/profile-images/${NotificationItem.sender.image}`}
    alt={'Profile pic'}
  />
    {/* User Information */}
    <h5 className="text-lg font-bold text-gray-800 mb-1">{NotificationItem.sender.name}</h5>
    <p className="text-sm text-gray-500 mb-4">{NotificationItem.sender.email}</p>
    {/* Action Buttons */}
    <div className="flex justify-center space-x-3">
      <button
        onClick={()=>acceptRequestHandle(NotificationItem.sender._id)}
        className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
      >
        Accept
      </button>
      <button
        onClick={()=>declinerequestHandle(NotificationItem.sender._id)}
        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
      >
        Decline
      </button>
      </div>
  </div>
</li>
  return (
    <>
    {/* <div className="max-w-sm mx-10 my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
      </svg>
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">You have a friend request from {NotificationItem.sender.name}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
      <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
        See our guideline
        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
        </svg>
      </a>
    </div> */}
    <tr key={NotificationItem._id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{NotificationItem.sender.name}</td>
        <td className="whitespace-nowrap px-4 py-2">
          <a
            href="#"
            onClick={()=>acceptRequestHandle(NotificationItem.sender._id)}
            className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
          >
            Accept
          </a>
        </td>
        <td className="whitespace-nowrap px-4 py-2">
          <a
            href="#"
            onClick={()=>declinerequestHandle(NotificationItem.sender._id)}
            className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
          >
            Decline
          </a>
        </td>
      </tr>

</>
  )
}

export default FriendRequestCard