import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginValidation from '../Schemas/LoginValidation'
import axios from 'axios'
import { API_URL } from '../Helpers/Paths'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate()
  let [loginStatus, setLoginStatus] = useState('')
  let [hidePw, setHidePw] = useState(true)
  let [isLoading, setIsLoading] = useState(false)
  let pwField = useRef('')
  const loginFrm = useFormik({
    validationSchema: LoginValidation,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (loginFrmData) => {
      setIsLoading(true)
      axios.post(`${API_URL}/login`, loginFrmData)
        .then(Response => {
          if (Response.data.success === true) {
            setLoginStatus('')
            localStorage.setItem('access-user', Response.data.token)
            localStorage.setItem('fullname', Response.data.name)
            localStorage.setItem('profile-image', Response.data.profileImg)
            setIsLoading(false)
            navigate('/myprofile')
          } else {
            if (Response.data.errorType === 1) {
              setLoginStatus('Username/password are invalid.')
            } else {
              setLoginStatus('Password is invalid.')
            }
            setIsLoading(false)
          }
        })
    }
  })
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Captures the essence of sharing and discovering vibes.
        </p>

        <form action="#" onSubmit={loginFrm.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Login to your account</p>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="text"
                onChange={loginFrm.handleChange}
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${loginFrm.errors.email && loginFrm.touched.email && 'border-red-500'}`}
                id='email'
                name='email'
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
            {loginFrm.errors.email && loginFrm.touched.email && <small className='text-red-500'>{loginFrm.errors.email}</small>}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                type="password"
                ref={pwField}
                onChange={loginFrm.handleChange}
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${loginFrm.errors.password && loginFrm.touched.password && 'border-red-500'}`}
                id='password'
                name='password'
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {
                  hidePw
                    ?
                    <FaEyeSlash size={17} onClick={() => {
                      setHidePw(false)
                      pwField.current.type = 'text'
                    }} className='text-gray-400 hover:text-gray-600 transform hover:scale-105' />
                    :
                    <FaEye size={17} onClick={() => {
                      setHidePw(true)
                      pwField.current.type = 'password'
                    }} className='text-gray-400 hover:text-gray-600 transform hover:scale-105' />
                }
              </span>
              {loginFrm.errors.password && loginFrm.touched.password && <small className='text-red-500'>{loginFrm.errors.password}</small>}
            </div>
          </div>

          <button
            type='submit'
            className={`w-full submit-btn relative flex items-center justify-center gap-2 shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500`}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-blue-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <span>Sign in</span>
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <NavLink className="underline hover:text-blue-600" to="/signup">Sign up</NavLink>
          </p>
          <div className='text-center text-red-500'>{loginStatus}</div>
        </form>
      </div>
    </div>
  )
}

export default Login