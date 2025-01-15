import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Button = ({ to, children, className }) => (
  <Link 
    to={to} 
    className={`px-6 py-2 md:px-10 md:py-3 lg:px-12 lg:py-4 text-white text-lg font-bold rounded active:bg-black-netflix-active ${className}`}
  >
    {children}
  </Link>
)

function Home() {
  return (
    <div className='bg-background-home bg-cover bg-center w-screen h-screen'>
      <header className='p-8 px-12 m-auto flex justify-between'>
        <img src={logo} alt='Company logo' className='w-32 md:w-36 lg:w-40 h-auto' />
        <div className='space-x-6 flex justify-items-center'>
          <Button to="/Sign in" className='bg-black-netflix'>Sign In</Button>
          <Button to="/Sign up" className='bg-red-netflix'>Sign Up</Button>
        </div>
      </header>
      <div className='px-12 fixed top-1/2 space-y-3'>
        <h1 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold'>Movies Delivered</h1>
        <h3 className='text-white text-lg md:text-xl lg:text-2xl'>Right to your mailbox. Free shipping, no late fees.</h3>
        <Button to="/Sign up" className='relative top-8 bg-red-netflix px-16 py-3 md:px-24 md:py-4 lg:px-32 lg:py-5 text-white text-xl font-normal rounded active:bg-red-netflix-active'>Sign Up</Button>
      </div>
    </div>
  )
}

export default Home