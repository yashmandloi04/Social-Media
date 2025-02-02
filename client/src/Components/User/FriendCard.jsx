import React, { useEffect } from "react";
import { API_PATH } from "../../Helpers/Paths";

const FriendCard = ({ friend, askDeleteFriendHandler, setModalOpen }) => {
  useEffect(()=>{
    console.log(friend)
  }, [])
  return <li key={friend._id} className="m-5 list-none">
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Profile Picture (Optional) */}
      {/* Uncomment and replace with a valid image source if needed */}
      <img
      className="w-20 h-20 rounded-full mb-4 shadow object-cover"
      src={`${API_PATH}/profile-images/${friend.myFriend.image}`}
      alt={friend.name}
    />
      {/* User Information */}
      <h5 className="text-lg font-bold text-gray-800 mb-1">{friend.myFriend.name}</h5>
      <p className="text-sm text-gray-500 mb-4">{friend.myFriend.email}</p>
      {/* Action Buttons */}
      <div className="flex justify-center space-x-3">
        <button
          onClick={() => {
            setModalOpen(true)
            askDeleteFriendHandler(friend)
          }}
          className="border border-red-300 bg-red-700 text-red-100 py-2 px-4 rounded-lg hover:bg-red-600 transition"
          type="button"
        >
          Un-Friend
        </button>

        {/* <button
        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition"
        // onClick={() => addFriendHandler(friend._id)}
      >
        Message
      </button> */}
        {/* Uncomment for a secondary button */}
        {/* <button className="border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
        Message
      </button> */}
      </div>
    </div>
  </li >
};

export default FriendCard;
