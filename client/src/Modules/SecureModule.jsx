import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer'

const SecureModule = () => {
  const navigate = useNavigate()
  useEffect(() => {
    checkToken()
  }, [])
  const checkToken = async ()=>{
    if (!localStorage.getItem('access-user')) {
      await navigate('/')
    }
  }
  return (
    <div className='flex flex-col'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default SecureModule