import React, { useState } from 'react'

function UserForm({ setUserInfo, setStep }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (e) => {
        setUserInfo(prevState => ({ ...prevState, username: e.target.value }));
    }
    
    const handlePasswordChange = (e) => {
        setUserInfo(prevState => ({ ...prevState, password: e.target.value }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        setError(null);
        try {
            setStep(2);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='relative bg-white shadow-lg shadow-slate-200 outline outline-1 outline-gray-300 rounded-sm p-8 w-full md:w-96'>
            <h1 className='text-neutral-600 font-bold text-4xl'>Sign Up</h1>
            <span className='absolute top-0 right-0 pr-5 pt-3 text-neutral-600'>Step 1 of 3</span>
            <form className='mt-12 space-y-6' onSubmit={handleSubmit}>
                    <input type='text' onChange={handleUsernameChange} placeholder='Username' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
                    <div className='relative'>
                        <input type={showPassword ? 'text' : 'password'} onChange={handlePasswordChange} placeholder='Add a Password' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
                        <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                <button type="submit" className='bg-red-netflix text-white font-normal text-2xl rounded w-full h-16 flex items-center justify-center active:bg-red-netflix-active'>
                    {loading ? 'Loading...' : 'Next'}
                </button>
            </form>
            {error && <div className='mt-4 text-red-500'>{error}</div>}
            <div className='h-52' />
        </div>
    )
}

export default UserForm