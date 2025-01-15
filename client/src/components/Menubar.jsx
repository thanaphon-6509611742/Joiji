import React from 'react'

function Menubar({ setGenre }) {
  const genres = ['All', 'Top10', 'Action', 'Adventure', 'Romance', 'Animation', 'Horror', 'Comedy', 'Drama'];

  const handleClick = (genre) => {
    setGenre(genre);
  }

  return (
    <div className='bg-neutral-100 p-5 text-white'>
        <div className='flex flex-wrap justify-around text-black font-light text-xl'>
            {genres.map((genre) => (
                <button 
                    key={genre}
                    onClick={() => handleClick(genre)} 
                    className={`m-2 p-2`}
                    aria-label={`Select ${genre}`}
                >
                    {genre}
                </button>
            ))}
        </div>
    </div>
  )
}

export default Menubar