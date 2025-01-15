import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Home2 ({ homeData })  {


    function renderStars (rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (rating >= i + 1) {
            stars.push(<FaStar key={i} className='text-yellow-500' />);
        } else if (rating >= i + 0.5) {
            stars.push(<FaStarHalfAlt key={i} className='text-yellow-500' />);
        } else {
            stars.push(<FaRegStar key={i} className='text-gray-300' />);
        }
    }
    return <div className='flex'>{stars}</div>;
};

// Function to format date
function formatDate (dateString) {
    // Create a Date object from the date string
    const date = new Date(dateString);
    // Convert the date object to a string in the desired format (YYYY-MM-DD)
    return date.toISOString().split('T')[0];
};

    return (
        <div>
            <h1 className='flex text-black font-medium text-3xl font-inter m-10'>Home 2</h1>
            <div className=''>
                <table className='w-full p-5'>
                    <thead>
                        <tr>
                            <th className='m-2 w-32 '></th>
                            <th className='w-96 p-3 text-2xl font-light'>Title</th>
                            <th className='w-32 p-3 text-2xl font-light text-left'>Rating</th>
                            <th className='w-64 p-3 text-2xl font-light'>Shipped</th>
                        </tr>
                    </thead>
                    <tbody className='font-normal text-2xl text-center'>
                        {homeData.map((orders, index) => (
                            <tr key={index} className='border-b border-gray-300 m-2'>
                                <td className='m-10 w-32 p-3'>{index + 1}.</td>
                                <td className='w-96 p-3'>{orders.title}</td>
                                <td className='w-32 p-3'>{renderStars(orders.rating)}</td>
                                <td className='w-64 p-3'>{formatDate(orders.rentDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home2;