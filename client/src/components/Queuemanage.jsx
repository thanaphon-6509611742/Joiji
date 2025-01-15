import React, { useState, useEffect } from 'react';

function Queuemanage() {
   
    const user = sessionStorage.getItem('user')

    const [queues, setQueues] = useState([]);


    function deleteQueue(queueData) {
        console.log(queueData);
        
        fetch(`${import.meta.env.VITE_API_URL}/orders/CancelledQueue/${user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_Queue: queueData.user_Queue, user: user }),
        })
        .then(response => response.json())
        .then(updatedQueues => {
            setQueues(updatedQueues);
        })
        .catch(error => console.error('Error:', error));
    }



    function moveQueueUp(queueData) {
       // console.log(queueData)
    
        const requestBody = { user: user, orderID: queueData.orderID, user_Queue: queueData.user_Queue, direction: -1 };
    
        fetch(`${import.meta.env.VITE_API_URL}/orders/moveQueues/${user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(() => {
            setQueues(queueData);
        })
        .catch(error => console.error('Error:', error));
    }
    
    function moveQueueDown(queueData) {
       // console.log(queueData) 
    
        const requestBody = { user: user, orderID: queueData.orderID, user_Queue: queueData.user_Queue, direction: 1 };
    
        fetch(`${import.meta.env.VITE_API_URL}/orders/moveQueues/${user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(() => {
            setQueues(queueData);
        })
        .catch(error => console.error('Error:', error));
    }

return {
    queues,
    deleteQueue,
    moveQueueUp,
    moveQueueDown
};
};

export default Queuemanage;