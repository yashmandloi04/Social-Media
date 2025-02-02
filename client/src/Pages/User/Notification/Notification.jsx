import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { API_PATH, API_URL } from "../../../Helpers/Paths";
import SryNotFound from "../../../Components/ChildProp/SryNotFound";

const Notification = () => {
  const componentName = 'Notification'
  let [ notificationList, setNotificationList ] = useState([])
  useEffect(()=>{
    getAllNotification()
  }, [])
  const getAllNotification = async ()=>{
    let response = await axios.get(`${API_URL}/notification`, {
      headers: {
        Authorization: localStorage.getItem('access-user')
      }
    })
    console.log(response.data)
    setNotificationList(response.data)
  }
  const getTimeAgo = (time)=>{
    let hour = (new Date(time).getTime() - new Date().getTime())/1000/60/60
    console.log('value of hour is ',hour.toFixed(6))
    if(hour < 0){
      console.log('FLOW ENTERD HERE')
      let min = hour * 60
      if(Math.abs(min)<1){
        let sec = min * 60
        return `${Math.abs(sec).toFixed(0)} Seconds ago`
      }else{
        return `${Math.abs(min).toFixed(0)} Minutes ago`
      }
    }else{
      return `${hour.toFixed(0)} Hours ago`
    }
  } 
  
  return (
    <div className="w-full min-h-[75vh] max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold text-red-800">Notifications</h3>
      </div>
      <ul className="divide-y">
        {(notificationList && notificationList.length) > 0 ? (
          notificationList.map((notification) => (
            <li
              key={notification.id}
              className={`my-4 p-4 rounded-md flex items-center bg-red-100 `}
            >
              {/* Notification Icon */}
              <div className="flex-shrink-0 mr-4">
                {notification.type === "like" && (
                  <AiOutlineLike size={25} className=" text-blue-500"/>
                )}
                {notification.type === "comment" && (
                  <FaRegComments size={25} className="
                  text-green-500" />
                )}
                {notification.type === "friend" && (
                  <FaUserFriends size={25} className="
                  text-purple-500" />
                )}
                {/* {notification.type === "follow" && (
                  <i className="bi bi-person-plus text-purple-500 text-2xl"></i>
                )} */}
              </div>
              {/* Notification Content */}
              <div className="flex-grow">
                <p className="text-sm text-gray-700">
                  {notification.senderId && notification.senderId.name} {notification.message}
                </p>
                <small className="text-gray-500">
                  {
                    getTimeAgo(notification.created_at)
                  }
                  {/* {
                    getTimeAgo(notification.created_at) < 0 ? getTimeAgo(notification.created_at) / (60) ('Seconds ago') :
                    getTimeAgo(notification.created_at) > 60 ? getTimeAgo(notification.created_at) * (60) ('Hours ago') :
                    getTimeAgo(notification.created_at) ('Minutes ago')
                  } */}
                  {/* {
                  getTimeAgo(notification.created_at).hour ? getTimeAgo(notification.created_at).hour ('Hours Ago') :
                  getTimeAgo(notification.created_at).min ? getTimeAgo(notification.created_at).min ('Minutes Ago') :
                  getTimeAgo(notification.created_at).sec ? getTimeAgo(notification.created_at).sec ('Seconds Ago') :
                  ''
                } */}
                </small>
              </div>
            </li>
          ))
        ) : 
        <SryNotFound cpName={componentName} />
        }
      </ul>
    </div>
  );
};

export default Notification;
