import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function SignIn() {

    const [userInfo, setUserInfo] = useState({ username: '', password: '' });
    const [error,setError] = useState();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    const handleUsernameChange = (e) => {
      setUserInfo(prevState => ({ ...prevState, username: e.target.value }));
    }
  
    const handlePasswordChange = (e) => {
      setUserInfo(prevState => ({ ...prevState, password: e.target.value }));
    }
  
    const handleSubmit = (e) => {
      setLoading(true);
      e.preventDefault();
      e.stopPropagation();

      fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      .then(response => {
          if (response.ok) {
            sessionStorage.setItem("user", `${userInfo.username}`);
            navigate('/Menu');
            return true;
          } else {
              setError('Incorrect username or password.');
              setUserInfo(prevState => ({ ...prevState, password: '' }));
              setLoading(false);
              return;
          }
      })
    }
    
    return (
      <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <Link to='/'>
          <img src={logo} alt='Company Logo' className='absolute left-8 top-8 w-32 md:w-36 lg:w-40 h-auto' />
        </Link>
        <div className='bg-white shadow-lg shadow-slate-200 outline outline-1 outline-gray-300 rounded-sm p-8 w-full md:w-96'>
          <h1 className='text-neutral-600 font-bold text-4xl'>Sign In</h1>
          <form className='mt-12 space-y-6' onSubmit={handleSubmit}>
            {error && <div className='bg-red-200 rounded-sm p-3 text-black font-medium outline outline-1 outline-red-600'>{error}</div>}
            <input type='text' value={userInfo.username} onChange={handleUsernameChange} placeholder='Username' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
            <div className='relative'>
              <input type={showPassword ? 'text' : 'password'} value={userInfo.password} onChange={handlePasswordChange} placeholder='Add a Password' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
              <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit" className='bg-red-netflix text-white font-normal text-2xl rounded w-full h-16 flex items-center justify-center active:bg-red-netflix-active'>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className='h-52' />
        </div>
      </div>
    )
  }

export default SignIn