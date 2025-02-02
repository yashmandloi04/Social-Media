import React from 'react'
import { Navigate } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('access-user')
  return (
    <Navigate to={'/'} />
  )
}

export default Logout