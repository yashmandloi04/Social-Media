import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_PATH, API_URL } from '../../../../Helpers/Paths'
import "./MyProfile.css"; // Import the custom CSS file

const MyProfile = () => {
  let [userData, setUserData] = useState({})
  useEffect(()=>{
    let token = localStorage.getItem('access-user')
    axios.get(`${API_URL}/myprofile`,{
      headers: {
        Authorization: token
      }
    })
    .then(Response => {
      setUserData(Response.data[0])
    })
  },[])
 return  <div className="w-full bg-white shadow-lg rounded-lg mb-6">
 {/* Cover Photo */}
 <div className="relative">
   <div className="w-full h-80">
   {
    userData.bg_image
    &&
    <img
     src={`${API_PATH}/profile-images/${userData.bg_image}`}
     alt="Cover"
     className="w-full h-80 object-cover rounded-t-lg"
   />
   }
   </div>
   {/* Profile Picture */}
   <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
     <img
       src={`${API_PATH}/profile-images/${userData.userId && userData.userId.image}`}
       alt="User"
       className="w-52 h-52 rounded-full border-4 border-white shadow-md object-cover"
     />
   </div>
 </div>

 {/* User Info */}
 <div className="text-center mt-16 p-4">
   <h2 className="text-4xl font-semibold m-5 break-words capitalize">
     {userData.userId && userData.userId.name}
   </h2>
   <p className="text-gray-600 m-5 text-2xl break-words">
     {userData.userId && userData.userId.email}
   </p>
   <div className="text-gray-800 text-lg mb-4 whitespace-pre-wrap break-words">
     {userData.bio && userData.bio}
   </div>
 </div>
</div>


  // return (
  //   <div className="w-full bg-white shadow-lg rounded-lg mb-6">
  //     {/* Cover Photo */}
  //     <div className="relative">
  //       <img
  //         src={`${API_PATH}/profile-images/${userData.bg_image}`}
  //         alt="Cover"
  //         className="w-full h-80 object-cover rounded-t-lg"
  //       />
  //       {/* Profile Picture */}
  //       <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
  //           <img
  //           src={`${API_PATH}/profile-images/${userData.userId && userData.userId.image}`}
  //           alt="User"
  //           className="w-52 h-52 rounded-full border-4 border-white shadow-md object-cover"
  //         />
  //       </div>
  //     </div>
  
  //     {/* User Info */}
  //     <div className="text-center mt-12 p-4">
  //       <h2 className="text-4xl font-semibold m-5">{userData.userId && userData.userId.name}</h2>
  //       <p className="text-gray-600 m-5 text-2xl">{userData.userId && userData.userId.email}</p>
  //       <p>
  //       <pre className="text-gray-800 text-lg mb-4">{userData.bio && userData.bio}</pre>
  //       </p>
  
  //       {/* Action Buttons */}
  //       {/* <div className="flex justify-center gap-4 mb-4">
  //         <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
  //           Follow
  //         </button>
  //         <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition">
  //           Message
  //         </button>
  //       </div> */}
  
  //       {/* User Stats */}
  //       {/* <div className="flex justify-around border-t border-gray-200 pt-4">
  //         <div className="text-center">
  //           <h6 className="text-lg font-bold">1.2K</h6>
  //           <small className="text-gray-500">Followers</small>
  //         </div>
  //         <div className="text-center">
  //           <h6 className="text-lg font-bold">350</h6>
  //           <small className="text-gray-500">Following</small>
  //         </div>
  //         <div className="text-center">
  //           <h6 className="text-lg font-bold">58</h6>
  //           <small className="text-gray-500">Posts</small>
  //         </div>
  //       </div> */}
  //     </div>
  //   </div>
  // );
  
  // return <div className="card user-profile shadow-sm mb-4">
  //     {/* Cover Photo */}
  //     <div className="profile-cover position-relative">
  //       <img
  //         src="https://via.placeholder.com/1200x300"
  //         alt="Cover"
  //         className="img-fluid"
  //       />
  //       {/* Profile Picture */}
  //       <div className="profile-picture">
  //         <img
  //           src={`${API_PATH}/profile-images/${userData.image}`}
  //           alt="User"
  //           className="rounded-circle border"
  //         />
  //       </div>
  //     </div>

  //     {/* User Info */}
  //     <div className="card-body text-center">
  //       <h5 className="card-title mb-1">{userData.name}</h5>
  //       <p className="text-muted mb-3">{userData.email}</p>
  //       <p className="user-bio mb-4">
  //         {userData.body}
  //       </p>
  //       {/* Action Buttons */}
  //       <div className="d-flex justify-content-center mb-4">
  //         <button className="btn btn-primary me-2">Follow</button>
  //         <button className="btn btn-outline-secondary">Message</button>
  //       </div>
  //       {/* User Stats */}
  //       <div className="d-flex justify-content-around border-top pt-3">
  //         <div>
  //           <h6 className="mb-0">1.2K</h6>
  //           <small className="text-muted">Followers</small>
  //         </div>
  //         <div>
  //           <h6 className="mb-0">350</h6>
  //           <small className="text-muted">Following</small>
  //         </div>
  //         <div>
  //           <h6 className="mb-0">58</h6>
  //           <small className="text-muted">Posts</small>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
}

export default MyProfile

// const MyProfile = () => {
  // const [userData, setUserData] = useState({});
  // const token = localStorage.getItem('access-user');

  // useEffect(() => {
  //   let token = localStorage.getItem('access-user')
  //   axios.get(`${API_URL}/myprofile`,{
  //     headers: {
  //       Authorization: localStorage.getItem('access-user')
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response.data)
//         setUserData(response.data[0]);
//         console.log(userData)
//       })
//       .catch((error) => {
//         console.error('Error fetching profile:', error);
//       });

//   },[]);

//   // Handle case where userData is not yet loaded
//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>My Profile</h2>
//       <p>Name: {userData.name}</p>
//       <p>Email: {userData.email}</p>
//     </div>
//   );
// };

// export default MyProfile;
