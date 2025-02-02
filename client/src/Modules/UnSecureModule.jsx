import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const UnsecuredModule = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('access-user')) {
      navigate('/home')
    }
  }, [])
  return (
    <Outlet />
  )
}

export default UnsecuredModule