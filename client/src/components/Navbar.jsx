import React from 'react'
import logo from '../assets/logo.png'
import Searchbar from './Searchbar'
import { Link, useLocation } from 'react-router-dom'
import avatar from '../assets/avatar.png'

function Navbar( { setSearchMovie } ) {
  const user = sessionStorage.getItem('user');
  const location = useLocation();

  return (
    <nav className='bg-stone-950 p-5 flex flex-col sm:flex-row justify-between'>
      <Link to="/Menu">
        <img src={logo} alt='Company logo' className='w-32 md:w-36 lg:w-40 h-auto' />
      </Link>
      <div className='my-2 w-full sm:w-4/12 h-12'>
        <Searchbar setSearchMovie={setSearchMovie} />
      </div>
      <div className='space-x-6 flex justify-items-center'>
        <Link to="/Queue" className={`mt-5 mb-5 text-white text-lg font-medium hover:underline ${location.pathname === "/Queue" ? "underline" : ""}`}>QUEUE</Link>
        <img src={avatar} alt='User avatar' className='w-12 h-12 sm:w-auto sm:h-auto' />
        <Link to="/EditAddressForm" className={`mt-5 mb-5 text-white text-lg text-nowrap font-medium hover:underline ${location.pathname === "/EditAddressForm" ? "underline" : ""}`}>{user}</Link>
      </div>
    </nav>
  )
}

export default Navbar