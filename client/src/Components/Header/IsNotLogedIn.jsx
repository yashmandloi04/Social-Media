import React from 'react'
import { NavLink } from 'react-router-dom'

const IsNotLogedIn = () => {
  return (
    <>
      <nav aria-label="Global" className="hidden md:block">

        <ul className="flex items-center gap-6 text-sm">
          <li>
            <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/home"> Home </NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">

        <div className="sm:flex sm:gap-4">
          <NavLink
            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            to="/"
          >
            Login
          </NavLink>

          <NavLink
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
            to="/signup"
          >
            Register
          </NavLink>
        </div>

        {/* <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> */}
      </div>
    </>
  )
}

export default IsNotLogedIn