import React from 'react'
import { NavLink } from 'react-router-dom'

const IsLogedIn = () => {
  return (
    <>
      <nav aria-label="Global" className="flex md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <NavLink
              to="/allusers"
              className="text-gray-500 transition hover:text-gray-500/75"
            >
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notification"
              className="text-gray-500 transition hover:text-gray-500/75"
            >
              Notifications
            </NavLink>
          </li>
          
        </ul>
      </nav>
      <div className="flex items-center gap-4">

        <div className="sm:flex sm:gap-4">
          <NavLink
            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            to="/logout"
          >
            Logout
          </NavLink>
        </div>

        <button
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
        </button>
      </div>
    </>
  )
}

export default IsLogedIn


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useState } from 'react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="w-full bg-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between px-4 py-3">
//         {/* Left-side Navigation Links */}
//         <ul className="flex items-center gap-6 text-sm">
//           <li>
//             <NavLink
//               to="/allusers"
//               className="text-gray-500 transition hover:text-gray-700"
//             >
//               All Users
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/notification"
//               className="text-gray-500 transition hover:text-gray-700"
//             >
//               Notifications
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/myprofile"
//               className="text-gray-500 transition hover:text-gray-700"
//             >
//               My Profile
//             </NavLink>
//           </li>
//         </ul>

//         {/* Right-side Logout Button */}
//         <div className="hidden sm:flex items-center gap-4">
//           <NavLink
//             to="/logout"
//             className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
//           >
//             Logout
//           </NavLink>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="block sm:hidden rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-700"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <ul className="sm:hidden flex flex-col items-start gap-4 px-4 py-2 border-t border-gray-200">
//           <li>
//             <NavLink
//               to="/allusers"
//               className="block text-gray-500 transition hover:text-gray-700"
//               onClick={() => setIsOpen(false)}
//             >
//               All Users
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/notification"
//               className="block text-gray-500 transition hover:text-gray-700"
//               onClick={() => setIsOpen(false)}
//             >
//               Notifications
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/myprofile"
//               className="block text-gray-500 transition hover:text-gray-700"
//               onClick={() => setIsOpen(false)}
//             >
//               My Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/logout"
//               className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
//               onClick={() => setIsOpen(false)}
//             >
//               Logout
//             </NavLink>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
