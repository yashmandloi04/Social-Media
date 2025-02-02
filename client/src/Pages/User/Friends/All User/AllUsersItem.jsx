import React from 'react'
import { API_PATH } from '../../../../Helpers/Paths'

// import './AllUsersItem.css'
const AllUserItem = ({ userItem, addFriendHandler }) => {

  return <li className="m-5 list-none">
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Profile Picture (Optional) */}
      {/* Uncomment and replace with a valid image source if needed */}
      <img
      className="w-20 h-20 rounded-full mb-4 shadow object-cover"
      src={`${API_PATH}/profile-images/${userItem.image}`}
      alt={userItem.name}
    />
      {/* User Information */}
      <h5 className="text-lg font-bold text-gray-800 mb-1">{userItem.name}</h5>
      <p className="text-sm text-gray-500 mb-4">{userItem.email}</p>
      {/* Action Buttons */}
      <div className="flex justify-center space-x-3">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          onClick={() => { addFriendHandler(userItem._id) }}
        >
          Add Friend
        </button>
        {/* {
          requestStatus.reacted == false
            ?
            (
              requestStatus.status == 'Not Sent'
                ?
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => { addFriendHandler(userItem._id) }}
                >
                  Add Friend
                </button>
                :
                // requestStatus.status === 'Pending'
                <button className="border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
                  Cancel Request
                </button>
            )
            :
            (
              requestStatus.reacted == true && requestStatus.status == 'Accept'
                ?
                <button className="border border-red-300 bg-red-700 text-red-100 py-2 px-4 rounded-lg hover:bg-red-600 transition">
                  Unfriend
                </button>
                :
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => addFriendHandler(userItem._id)}
                >
                  Add Friend
                </button>
            )

        } */}




      </div>
    </div>
  </li>
}

export default AllUserItem