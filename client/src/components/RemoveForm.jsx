import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

function RemoveForm() {

  const [table, setTable] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const permissions = sessionStorage.getItem('permission');

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Stock',
      selector: row => row.stock,
    },
    {
      name: 'Edit',
      cell: (row) => (
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleRemove(row.filmID)}>Remove</button>
      ),
      button: true,
    },
  ];

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/movies`),
      fetch(`${import.meta.env.VITE_API_URL}/foreign`),
      fetch(`${import.meta.env.VITE_API_URL}/moreforeign`),
      fetch(`${import.meta.env.VITE_API_URL}/orderforeign`),
      fetch(`${import.meta.env.VITE_API_URL}/edit`)
    ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([movies, foreign, moreforeign, orderforeign, edit]) => {
      setIsLoaded(true);
      setTable(movies);
      // You can do something with the other responses here
    })
    .catch(error => {
      setIsLoaded(true);
      setError(error);
    });
  }, []);

  const handleRemove = (filmID) => {
    Swal.fire({
      title: "Remove this movie?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/moreforeign/${filmID}`, { method: 'DELETE' }),
          fetch(`${import.meta.env.VITE_API_URL}/foreign/${filmID}`, { method: 'DELETE' }),
          fetch(`${import.meta.env.VITE_API_URL}/edit/${filmID}`, { method: 'DELETE' }),
          fetch(`${import.meta.env.VITE_API_URL}/orderforeign/${filmID}`, { method: 'DELETE' })
        ])
        .then(() => {
          return fetch(`${import.meta.env.VITE_API_URL}/movies/${filmID}`, { method: 'DELETE' });
        })
        .then(res => {
          const updatedTable = table.filter(item => item.filmID !== filmID);
          setTable(updatedTable);
          Swal.fire({
            title: "Deleted!",
            text: "This movie has been deleted.",
            icon: "success"
          });
        })
        .catch(error => {
          console.error("Error deleting movie and associated records:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete.",
            icon: "error"
          });
        });
      }
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <br/>
        {permissions == 1 && (
          <>
        <label className="p-10 text-3xl uppercase font-bold text-stone-700">Remove Movie</label>
          <div className="justify-self-stretch border-b-2 border-stone-600 opacity-25"></div><br></br>
        <div className="w-full">
        <DataTable 
          columns={columns}
          data={table}
        />
        </div>
        </>
      )}
        {permissions != 1 && (
        <div className="flex flex-col justify-center items-center h-3/6 mx-96 overflow-hidden">
          <i className="fas fa-lock text-red-500 text-6xl mb-4"></i>
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Sorry, only managers can add movies.
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            You need to have manager permissions to remove a new movie.
          </p>
        </div>
      )}
      </div>
    );
  }
}

export default RemoveForm;