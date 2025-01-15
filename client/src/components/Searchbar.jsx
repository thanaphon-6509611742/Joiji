import React, { useState } from 'react'
import searchIcon from '../assets/search.svg'

function Searchbar({ setSearchMovie }) {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await setSearchMovie(searchInput);
    setIsLoading(false);
  }

  return (
    <div className='flex w-full rounded-sm border-2 border-stone-300'>
      <input 
        className='w-full p-3 bg-transparent text-lg text-white outline-none rounded-sm' 
        placeholder='Search movies' 
        onChange={ handleSearchChange } 
        onKeyDown={ handleSearchKeyDown }
        aria-label='Search movies'
      />
      <button 
        type='submit' 
        className={`text-white bg-stone-300 border-4 border-l-0 border-stone-300 w-14 ${isLoading ? 'bg-gray-500' : ''}`} 
        onClick={ handleSearch }
        disabled={isLoading}
      >
        <img src={searchIcon} alt='search' className='ml-1 w-full h-full'/>
      </button>
    </div>
  );
}

export default Searchbar