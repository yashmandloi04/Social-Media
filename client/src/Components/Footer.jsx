import React from 'react'
import { API_PATH } from '../Helpers/Paths'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <svg height={40} width={200}>
              <image
                href={`/logo.png`}
                style={{ height: '40px', width: '200px' }}
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
            </svg>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2022. All rights reserved.
          </p>
          <small className='block mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right'>Developed by {<NavLink to={'https://www.linkedin.com/in/yash-mandloi-302836338'}><span className='hover:text-blue-500 hover:underline italic'>Yash Mandloi&#10084;</span></NavLink>}</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer