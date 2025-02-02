import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Home from '../Pages/User/Home/Home'
import MyProfileModule from '../Modules/MyProfileModule'
import MyProfile from '../Pages/User/MyProfile/Profile/MyProfile'
import EditProfile from '../Pages/User/MyProfile/EditProfile'
import AllUsers from '../Pages/User/Friends/All User/AllUsers'
import Notification from '../Pages/User/Notification/Notification'
import SecureModule from '../Modules/SecureModule'
import UnsecuredModule from '../Modules/UnSecureModule'
import FriendModule from '../Modules/FriendModule'
import Friend from '../Pages/User/Friends/MyFriends/Friend'
import FriendRequest from '../Pages/User/Friends/Friend Request/FriendRequest'
import Logout from '../Pages/User/Logout'
import HomeModule from '../Modules/HomeModule'
import CreatePost from '../Pages/User/Home/CreatePost'
import ChangePw from '../Pages/User/MyProfile/ChangePw'
import NoPageFound from '../Components/ChildProp/NoPageFound'
const AllRoute = () => {
  return (
    <Routes>
      <Route path='' element={<UnsecuredModule />}>
        {/* <Route path='home' element={<Home />} /> */}
        <Route path='signup' element={<SignUp />} />
        <Route path='' element={<Login />} />
      </Route>

      <Route path='' element={<SecureModule />}>
        <Route path='home' element={<HomeModule />} >
        <Route path='' element={<Home />} />
        <Route path='createpost' element={<CreatePost />} />
        </Route>
        <Route path='myprofile' element={<MyProfileModule />} >
          <Route path='' element={<MyProfile />} />
          <Route path='edit' element={<EditProfile />} />
          <Route path='chanpw' element={<ChangePw />} />
        </Route>
        <Route path='friend' element={<FriendModule />} >
          <Route path='' element={<Friend />} />
          <Route path='friendrequest' element={<FriendRequest />} />
          <Route path='allusers' element={<AllUsers />} />
        </Route>
        <Route path='notification' element={<Notification />} />
        <Route path='logout' element={<Logout />} />
      </Route>

      <Route path='*' element={<NoPageFound />} />

    </Routes>
  )
}

export default AllRoute