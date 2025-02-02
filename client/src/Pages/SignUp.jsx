import './SignUp.module.css'
import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import SignupValidation from '../Schemas/signupValidation';
import axios from 'axios'
import { API_PATH, API_URL } from '../Helpers/Paths';

const SignUp = () => {
  const navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false)
  let imgField = useRef('')
  const signupFrm = useFormik({
    validationSchema: SignupValidation,
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      marketing_accept: false,
      image: '',
    },
    onSubmit: async (signupFrmData) => {
      setIsLoading(true)
      let image = imgField.current.files[0]
      let form = new FormData()
      form.append('image', image)
      form.append('name', signupFrmData.name)
      form.append('email', signupFrmData.email)
      form.append('password', signupFrmData.password)
      form.append('password_confirmation', signupFrmData.password_confirmation)
      form.append('marketing_accept', signupFrmData.marketing_accept)
      let response = await axios.post(`${API_URL}/signup`, form)
      setIsLoading(false)
      if (response.data.success) {
        navigate('/')
      }

    }
  })

  return (
    <div className='w-11/12 h-auto py-10 flex justify-center'>
      <section className="p-10 bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <NavLink to="#" className="flex items-center">
                <svg height={40} width={200} >
                  <image
                    href={`${API_PATH}/images/logo.png`}
                    style={{ height: '40px' }}
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                  />
                </svg>
              </NavLink>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome To VibeHub
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Captures the essence of sharing and discovering vibes.
              </p>

              <form action="#" onSubmit={signupFrm.handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="FullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="FullName"
                    name="name"
                    onChange={signupFrm.handleChange}
                    className={`mt-1 w-full h-8 p-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${signupFrm.errors.name && signupFrm.touched.name && 'border-red-500'}`}
                  />

                  {signupFrm.errors.name && signupFrm.touched.name && <small className='text-red-500'>{signupFrm.errors.name}</small>}
                </div>

                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    onChange={signupFrm.handleChange}
                    className={`mt-1 w-full h-8 p-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${signupFrm.errors.email && signupFrm.touched.email && 'border-red-500'}`}
                  />

                  {signupFrm.errors.email && signupFrm.touched.email && <small className='text-red-500'>{signupFrm.errors.email}</small>}
                </div>

                <div className="h-auto col-span-6 sm:col-span-3">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    onChange={signupFrm.handleChange}
                    className={`mt-1 w-full h-8 p-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${signupFrm.errors.password && signupFrm.touched.password && 'border-red-500'}`}
                  />

                  {signupFrm.errors.password && signupFrm.touched.password && <small className='text-red-500'>{signupFrm.errors.password}</small>}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    onChange={signupFrm.handleChange}
                    className={`mt-1 w-full h-8 p-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${signupFrm.errors.password_confirmation && signupFrm.touched.password_confirmation && 'border-red-500'}`}
                  />

                  {signupFrm.errors.password_confirmation && signupFrm.touched.password_confirmation && <small className='text-red-500'>{signupFrm.errors.password_confirmation}</small>}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="file"
                    ref={imgField}
                    name="image"
                    onChange={signupFrm.handleChange}
                    className={`mt-1 w-full h-9 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${signupFrm.errors.image && signupFrm.touched.image && 'border-red-500'}`}
                  />

                  {signupFrm.errors.image && signupFrm.touched.image && <small className='block text-red-500'>{signupFrm.errors.image}</small>}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      onChange={signupFrm.handleChange}
                      style={{appearance: 'auto'}}
                      className="w-5 h-5 rounded-md border-gray-200 bg-white shadow-sm focus:ring focus:ring-blue-500"
                    />
                    <label htmlFor="MarketingAccept" className="text-sm text-gray-700">
                      I agree to the Terms and Privacy Policy.
                    </label>
                  </div>

                  {signupFrm.errors.marketing_accept && signupFrm.touched.marketing_accept && <small className='text-red-500'>{signupFrm.errors.marketing_accept}</small>}
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                    and
                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">

                  <button
                    type='submit'
                    className={`submit-btn relative flex items-center justify-center gap-2 shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500`}
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
                    <span>Create an account</span>
                  </button>


                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <NavLink to="/" className="text-gray-700 hover:text-blue-600 underline">Log in</NavLink>.
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}

export default SignUp