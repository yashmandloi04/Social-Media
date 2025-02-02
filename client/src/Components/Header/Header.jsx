import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import IsNotLogedIn from './IsNotLogedIn'
import IsLogedIn from './IsLogedIn'
import { API_PATH } from '../../Helpers/Paths'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="#" className="flex items-center">
            <svg height={40} width={200} >
            <image
              href={`/logo.png`}
              style={{height: '40px', width: '200px'}}
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            </svg>
          </NavLink>
          <div className="flex items-center lg:order-2">
            <NavLink
              to="/logout"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Logout
            </NavLink>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} w-6 h-6`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} w-6 h-6`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/home"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-primary-700 hover:text-white lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/friend"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b hover:bg-primary-700 hover:text-white border-gray-100  lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Friends
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/notification"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-primary-700 hover:text-white lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Notifications
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myprofile"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-primary-700 hover:text-white lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  My Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
  // console.log(localStorage.getItem('access-user'))
  // return (
  //   <header>
  //     <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
  //       <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
  //         <NavLink to="https://flowbite.com" className="flex items-center">
  //           <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
  //           <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">Flowbite</span>
  //         </NavLink>
  //         <div className="flex items-center lg:order-2">
  //           {/* <NavLink to="#" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log in</NavLink> */}
  //           <NavLink to="/logout" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Logout</NavLink>
  //           <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
  //             <span className="sr-only">Open main menu</span>
  //             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
  //             <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
  //           </button>
  //         </div>
  //         <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
  //           <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
  //             <li>
  //               <NavLink to="/home" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">Home</NavLink>
  //             </li>
  //             <li>
  //               <NavLink to="/friend" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">Friends</NavLink>
  //             </li>
  //             <li>
  //               <NavLink to="/notification" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">Notifications</NavLink>
  //             </li>
  //             <li>
  //               <NavLink to="/myprofile" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">My Profile</NavLink>
  //             </li>
  //             {/* <li>
  //               <NavLink to="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">My Profile</NavLink>
  //             </li>
  //             <li>
  //               <NavLink to="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">Contact</NavLink>
  //             </li> */}
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   </header>

  // )


export default Header