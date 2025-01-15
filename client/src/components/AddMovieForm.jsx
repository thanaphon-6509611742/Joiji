import React, {useState, useEffect, useRef} from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

 function AddMovieForm() {

  const fileInput = useRef();

    const [filmId, setFilmId] = useState(0);
    const [title, setTitle] = useState("");
    const [stock, setStock] = useState(0);
    const [outline, setOutline] = useState("");
    const [directors, setDirectors] = useState("");
    const [stars, setStars] = useState("");
    const [genre, setGenre] = useState("");
    const [poster, setPoster] = useState([]);
    const [movieList, setMovieList] = useState([""]);
    const [posterURLs, setPosterURLs] = useState([]);
    const isFirstRender = useRef(true);
    const permissions = sessionStorage.getItem('permission');
    
  useEffect(() => {
    if(poster.length < 1) return;
    const newPosterURLs = [];
    poster.forEach(poster => newPosterURLs.push(URL.createObjectURL(poster)))
    setPosterURLs(newPosterURLs);
  }, [poster]);

  const onPosterChange = (e) => {
    setPoster([...e.target.files]);
  }

  console.log("Poster: ",poster);

  useEffect(() => {
    if (isFirstRender.current || filmId === 0) {
      isFirstRender.current = false;
      return;
    }
    
    const star = stars.split(", ");
    const director = directors.split(", ");

    const file = fileInput.current.files[0];
    const fromData = new FormData();
    fromData.append('image', file);

    star.map(star => {
      return Axios.post(`${import.meta.env.VITE_API_URL}/stars`, {
        filmId: filmId,
        star: star
      })
      .then(() => {
        setMovieList(prevMovieList => [
          ...prevMovieList,
          {
            filmId: filmId,
            star: star
          }
        ]);
      })
    });

    director.map(director => {
      return Axios.post(`${import.meta.env.VITE_API_URL}/directors`, {
        filmId: filmId,
        director: director
      })
      .then(() => {
        setMovieList(prevMovieList => [
          ...prevMovieList,
          {
            filmId: filmId,
            director: director
          }
        ]);
      })
    });
    
      fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: fromData,
      })
      .then((response) => {
        if(response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Your action has been completed successfully.",
            icon: "success"
          });
        }
      })
        
  }, [filmId])

    const addMovie = (e) => {
    e.preventDefault();

    Axios.post(`${import.meta.env.VITE_API_URL}/films`, {
      title: title,
      stock: stock,
      outline: outline,
      genre: genre,
      poster_Path: title.replace(/\s/g, "-")+("-movie-poster.png"),
      staff: sessionStorage.getItem('staffId'),
      adminUser: sessionStorage.getItem('staffUsername') 
    })
    .then(response => {
      setFilmId(response.data);
    })
    }
      // setMovieList([
      //   ...movieList,
      //   {
      //     title: title,
      //     stock: stock,
      //     outline, outline,
      //     genre: genre,
      //     poster_Path: title.replace(/\s/g, "-")+("-movie-poster.png"), 
      //     staff: sessionStorage.getItem('staffId'),
      //     adminUser: sessionStorage.getItem('staff')  
      //   }
      // ])

      
  return (
    <div className="bg-white-500">
      <br/>
      {permissions == 1 && (
        <>
        <label className="p-10 text-3xl uppercase font-bold text-stone-700">Add movie</label>
        <div className="justify-self-stretch border-b-2 border-stone-600 opacity-25"></div><br></br>
        <div>
        </div>
        <form>
        <div className='mt-2 ml-10 flex flex-row'>
            <div className="flex flex-col">
                <div className='flex flex-col'>
                    <label className="text-lg text-stone-700 font-semibold">Title</label>
                    <input 
                    type="text" 
                    name="Title"
                    onChange={(event) => {
                      setTitle(event.target.value)
                    }}
                    required
                    className="px-4 box-border h-8 w-60 text-md text-stone-600 border-2 border-stone-500 rounded-md text-base focus:border-stone-500"></input>
                </div>

                <div className='flex flex-col'>
                    <label className="mt-8 text-lg text-stone-700 font-semibold">Stock</label>
                    <input 
                      type="text" 
                      name="Stock"
                      onChange={(event) => {
                        setStock(event.target.value)
                      }}
                      required
                      className="px-4 box-border h-8 w-60 text-md text-stone-600 border-2 border-stone-500 rounded-md text-base focus:border-stone-500"></input> 
                </div>  
                
                <div className='flex flex-col'>
                    <label className="mt-8 text-lg text-stone-700 font-semibold">Outline</label>
                    <input 
                    type="text" 
                    name="Outline"
                    onChange={(event) => {
                      setOutline(event.target.value)
                    }}
                    required
                    className="px-4  box-border h-40 w-60 text-md text-stone-600 border-2 border-stone-500 rounded-md text-base focus:border-stone-500"></input> 
                </div>
                </div>
                <div className='flex flex-col ml-40'>
                <div className='flex flex-col'>
                    <label className="text-lg text-stone-700 font-semibold ">Directors</label>
                    <input 
                    type="text" 
                    name="Directors" 
                    onChange={(event) => {
                      setDirectors(event.target.value)
                    }}
                    required
                    className="px-4 box-border h-8 w-60 text-md text-stone-600 border-2 border-stone-500 rounded-md text-base focus:border-stone-500"></input>
                </div>
                <div className='flex flex-col'>
                    <label className="text-lg mt-8 text-stone-700 font-semibold">Stars</label>
                    <input 
                      type="text" 
                      name="Stars"
                      onChange={(event) => {
                        setStars(event.target.value)
                      }}
                      required
                      className="px-4 box-border h-8 w-60 text-md text-stone-600 border-2 border-stone-500 rounded-md text-base focus:border-stone-500"></input> 
                </div>
                <div className='flex flex-col'>
                <label className="mt-8 text-lg text-stone-700 font-semibold">Genre</label>
                  <select 
                  name="Genre" 
                  className="px-4 box-border h-10 w-60 text-md text-stone-600 border-2 border-stone-500 rounded-md text-base focus:border-stone-500" 
                  onChange={(event) => {
                    setGenre(event.target.value)
                  }}
                  required>
                        <option value=""disabled selected hidden>Please select</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Romance">Romance</option>
                        <option value="Animation">Animation</option>
                        <option value="Horror">Horror</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                    </select>
                </div> 
                <div>
                  <input type="file" ref={fileInput} accpet="images/*" onChange={onPosterChange} className="mt-8 border-stone-600 w-60 rounded-md py-2 px-4"/>
                {posterURLs.map((posterSrc) => ( <img width="480" height="auto" src={posterSrc} />))}
                </div> 
                </div>
            </div><br></br><br></br>
            <div className="ml-10">
              <input type="submit" onClick={addMovie} value="Save" className="mr-6 box-content h-12 w-80 font-semibold text-lg text-white border-5 border-red-500 rounded-md
                                     bg-gradient-to-r from-pink-500 to-red-500
                                     hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 hover:shadow-md transition-all duration-300
                                     active:bg-gradient-to-r active:text-white-800 active:from-red-600 active:to-red-800"></input>
            </div>
        </form>
        </>
      )}
      {permissions != 1 && (
        <div className="flex flex-col justify-center items-center h-3/6 mx-96 overflow-hidden">
          <i className="fas fa-lock text-red-500 text-6xl mb-4"></i>
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Sorry, only managers can add movies.
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            You need to have manager permissions to add a new movie.
          </p>
        </div>
      )}
    </div>
  )
}
 

export default AddMovieForm