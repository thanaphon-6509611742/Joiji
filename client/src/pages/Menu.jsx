import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Menubar from '../components/Menubar'
import { motion } from 'framer-motion'
import Moviedetail from '../components/Moviedetail'

function Menu() {

  const [genre, setGenre] = useState('All')
  const [poster, setPoster] = useState([])
  const [searchMovie, setSearchMovie] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current || searchMovie === '') {
      isFirstRender.current = false;
      return;
    }

    setGenre('Search');
    fetch(`${import.meta.env.VITE_API_URL}/movies/poster/search/${searchMovie}`)
      .then(response => response.json())
      .then(movieData => {
        setPoster(movieData)
      })
      .catch(error => console.error('Error:', error));
  }, [searchMovie]);

  useEffect(() => {
    if (genre === 'Search') {
      return;
    }

    setSearchMovie('');
    fetch(`${import.meta.env.VITE_API_URL}/movies/${genre}/poster`)
      .then(response => response.json())
      .then(movieData => {
        setPoster(movieData)
      })
      .catch(error => console.error('Error:', error));
  }, [genre]);

  return (
    <div>
      <Navbar setSearchMovie={setSearchMovie}/>
      <Menubar setGenre={setGenre} />
      <div className='font-normal ml-24 my-16 text-4xl'>{genre}</div>
      <div className='mx-4 w-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2'>
        {poster.map((poster) => (
          <motion.img 
            key={genre + poster.filmID} 
            src={import.meta.env.VITE_PATH_POSTER + poster.poster_path} 
            alt={poster.filmID} 
            className='w-64 h-96 cursor-pointer'
            initial={{ opacity: 0, scale: 0.9}}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            onClick={() => {setSelectedMovie(poster.filmID)}}
          />
        ))}
      </div>
      {selectedMovie && <Moviedetail filmID={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  )
}

export default Menu
