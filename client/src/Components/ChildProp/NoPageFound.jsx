import React from 'react'
import { API_PATH } from '../../Helpers/Paths'

const NoPageFound = () => {
  return (
    <div className='p-10 flex flex-col justify-center items-center'>
      {/* src={`/src/assets/404-Notfound.jpg`} */}
      <img src={`/dist/404-Notfound.jpg`} style={{height: '400px'}} alt="Not Found image" />
    </div>
  )
}

export default NoPageFound