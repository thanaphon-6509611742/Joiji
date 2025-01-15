import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function Moviedetail( { filmID, onClose }) {
    const [movie, setMovie] = useState({})
    const [director, setDirector] = useState([])
    const [star, setStar] = useState([])
    const user = sessionStorage.getItem('user')

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_API_URL}/${user}/queue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                filmID: filmID
            })
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: `${movie.title} has been added to your queue!`,
                    icon: "success",
                  });

                fetch(`${import.meta.env.VITE_API_URL}/${filmID}/stock`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else if(response.status === 400) {
                response.text().then(error => {
                    Swal.fire({
                        title: "Oops!",
                        text: `${error}`,
                        icon: "error",
                    });
                });
            }
        
        })
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/movies/${filmID}`)
            .then(response => response.json())
            .then(movieData => {
                setMovie(movieData[0])
            })
            .catch(error => console.error('Error:', error));

        fetch(`${import.meta.env.VITE_API_URL}/movies/${filmID}/director`)
            .then(response => response.json())
            .then(directorData => {
                setDirector(directorData)
            })
            .catch(error => console.error('Error:', error));

        fetch(`${import.meta.env.VITE_API_URL}/movies/${filmID}/star`)
            .then(response => response.json())
            .then(starData => {
                setStar(starData)
            })
            .catch(error => console.error('Error:', error));
    }, [filmID]);

    return (
        <div className='z-50 fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center' onClick={onClose}>
            <div className='container mx-auto bg-white max-w-screen-lg rounded-lg overflow-hidden' onClick={e => e.stopPropagation()}>
                <header className='flex justify-end bg-stone-100 bg-opacity-20 w-full h-16 border border-stone-300'>
                    <button className='text-black text-6xl font-light mr-3' onClick={onClose} aria-label="Close">&times;</button>
                </header>
                <div className='container flex flex-col md:flex-row w-full'>
                    <div className='flex-grow p-8 max-w-xl'>
                        <h1 className='text-3xl font-medium'>{movie.title}</h1>
                        <p className='mt-5 mb-8 h-[150px]'>
                            <span className='text-warp font-normal text-lg h-36'>
                                {movie.outline}
                            </span>
                        </p>
                        <p className='font-medium text-lg'>
                            Director:
                            <span className='font-normal'>
                                {director.map((d, index) => (
                                    <span key={index}> {d.director}{index < director.length - 1 ? ', ' : ''}</span>
                                ))}
                            </span>
                        </p>
                        <p className='font-medium text-lg'>
                            Star:
                            <span className='font-normal'>
                                {star.map((s, index) => (
                                    <span key={index}> {s.star}{index < star.length - 1 ? ', ' : ''}</span>
                                ))}
                            </span>
                        </p>
                        <p className='font-medium text-lg'>
                            Genre:{" "}
                            <span className='font-normal'>
                                {movie.genre}
                            </span>
                        </p>
                        <p className='font-medium text-lg'>
                            Stock:{" "}
                            <span className='font-normal'>
                                {movie.stock}
                            </span>
                        </p>
                        <button type='submit' onClick={handleSubmit} className='bg-red-netflix mt-12 py-5 px-28 text-white font-normal text-xl rounded flex items-center justify-center active:bg-red-netflix-active'>+ Add to Queue</button>
                    </div>
                    <div className='m-8 pl-20'>
                        <img src={import.meta.env.VITE_PATH_POSTER + movie.poster_path} alt={movie.title} className='"object-cover object-center w-64 h-auto shadow-lg outline outline-1 outline-slate-100'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Moviedetail