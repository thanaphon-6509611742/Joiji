import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar,FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';
import Queuemanage from './Queuemanage'; 

function Queue3 ({queueData}) {
    
const renderStars = (rating) => {
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
    
    const queuemanage = Queuemanage();

    return (
        <div>
            <h2 className='flex text-black font-medium text-3xl font-inter m-10'>Queue 3</h2>

            <div>
                <table className='w-full p-5'>
                    <thead>
                        <tr>
                            <th className='m-2 w-32'></th>
                            <th className='w-96 p-3 text-2xl font-light'>Title</th>
                            <th className='w-32 p-3 text-2xl font-light text-left'>Rating</th>
                            <th className='w-64 p-3 text-2xl font-light'>Genre</th>
                           
                        </tr>
                    </thead>
                    <tbody className='font-normal text-2xl text-center'>
                        {queueData.map((queue, index) => (
                            <tr key={index} className='border-b border-gray-300 m-2'>
                                <td className='m-10 w-32 p-3'>{index + 1}.</td>
                                <td className='w-96 p-3'>{queue.title}</td>
                                <td className='w-32 p-3'>{renderStars(queue.rating)}</td>
                                <td className='w-64 p-3 '> {queue.genre} 
                               <div className=" text-right space-x-2 ">
                                <button
                                        onClick={() => queuemanage.moveQueueUp(queue)}
                                        title="Move Queue Up"
                                        className="text-xl mx-2 "
                                    >
                                        <FaArrowUp />
                                    </button>
                                    <button
                                        onClick={() => queuemanage.moveQueueDown(queue)}
                                        title="Move Queue Down"
                                        className="text-xl mx-2 "
                                    >
                                        <FaArrowDown />
                                    </button>
                                   
                                    <button
                                        onClick={() => queuemanage.deleteQueue(queue)}
                                        title="Delete Queue"
                                        className="text-3xl mx-2 text-white bg-red-600 p-2 rounded"
                                    >
                                         
                                        <FaTrash />
                                    </button>
                                    </div>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default Queue3;