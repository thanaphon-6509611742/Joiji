import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaPlus, FaMinus } from 'react-icons/fa';
import { LuSave } from "react-icons/lu";

function History({ historyData }) {
    const [ratings, setRatings] = useState({});
    const user = sessionStorage.getItem('user');

    useEffect(() => {
        // Initialize ratings state for the current user only
        const initialRatings = {};
        historyData.forEach((order, index) => {
            // Check if the order is made by the current user
            if (order.username === user) {
                initialRatings[index] = order.rating;
            }
        });
        setRatings(initialRatings);
    }, [historyData, user]);

    const handleRatingChange = (index, newRating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [index]: newRating
        }));
    };

    const handleStarClick = (index, action) => {
        let newRating;
        switch (action) {
            case "increase":
                newRating = ratings[index] < 5 ? Math.ceil(ratings[index] + 1) : 5;
                break;
            case "decrease":
                newRating = ratings[index] > 0 ? ratings[index] - 1 : 0;
                break;
            case "half":
                newRating = Math.floor(ratings[index]) + 0.5;
                if (ratings[index] % 1 !== 0) {
                    newRating = Math.ceil(ratings[index]);
                }
                break;
            default:
                newRating = ratings[index];
                break;
        }
        handleRatingChange(index, newRating);
    };

    const handleSaveAndUpdate = async (orderID, filmID, index) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/history/rating/${orderID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newRating: ratings[index] }),
            });
            if (!response.ok) {
                throw new Error('Failed to save ratings');
            }
            // Update average rating
            const updateResponse = await fetch(`${import.meta.env.VITE_API_URL}/orders/history/avgrating/${filmID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!updateResponse.ok) {
                throw new Error('Failed to update average rating');
            }
        } catch (error) {
            console.error('Error saving and updating ratings:', error.message);
        }
    };

    const handleClearRating = (index) => {
        handleRatingChange(index, 0); // Set rating to 0
    };

    const renderStars = (index, rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating >= i + 1) {
                stars.push(<FaStar key={i} className='text-yellow-500' onClick={() => handleStarClick(index, 'increase')} />);
            } else if (rating >= i + 0.5) {
                stars.push(<FaStarHalfAlt key={i} className='text-yellow-500' onClick={() => handleStarClick(index, 'half')} />);
            } else {
                stars.push(<FaRegStar key={i} className='text-gray-300' onClick={() => handleStarClick(index, 'decrease')} />);
            }
        }
        return <div className='flex'>{stars}</div>;
    };

    return (
        <div>
            <h1 className='flex text-black font-medium text-3xl font-inter m-10'>History</h1>
            <div className=''>
                <table className='w-full p-5'>
                    <thead>
                        <tr>
                            <th className='m-2 w-32'></th>
                            <th className='w-96 p-3 text-2xl font-light'>Title</th>
                            <th className='w-32 p-3 text-2xl font-light text-left'>Rating</th>
                            <th className='w-64 p-3 text-2xl font-light'>Returned</th>
                            <th className='w-32 p-3 text-2xl font-light'></th>
                        </tr>
                    </thead>
                    <tbody className='font-normal text-2xl text-center'>
                        {historyData.map((orders, index) => 
                            user === orders.username && (
                                <tr key={index} className='border-b border-gray-300 m-2'>
                                    <td className='m-10 w-32 p-3'>{index + 1}.</td>
                                    <td className='w-96 p-3'>{orders.title}</td>
                                    <td className='w-32 p-3'>
                                        {renderStars(index, ratings[index])}
                                        <div className="flex mt-2" style={{ marginLeft: "16px" }}>
                                            <FaPlus className="text-green-500 cursor-pointer mr-2" onClick={() => handleStarClick(index, 'increase')} />
                                            <FaMinus className="text-red-500 cursor-pointer mr-2" onClick={() => handleStarClick(index, 'decrease')} />
                                            <FaStarHalfAlt className="text-yellow-500 cursor-pointer" onClick={() => handleStarClick(index, 'half')} />
                                        </div>
                                    </td>
                                    <td className='w-64 p-3 relative'>
                                        {orders.returnDate}
                                        <div className="absolute bottom-6 right-0">
                                            <LuSave className="text-black-500 cursor-pointer text-4xl" onClick={() => handleSaveAndUpdate(orders.orderID, orders.filmID, index)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default History;
