import './OrderDetail.css';
import React from 'react'

function OrderDetail(props) {

  const { order, onBgClick, userQuota} = props;
  const staffID = sessionStorage.getItem('staffId');
  const username = order.username

  return (

    <div className="tattoo-post">

      <div className="tattoo-bg" onClick={onBgClick} />

      <div className="tattoo-content">

        <div className='post'> 
        
        <div className='post-content'>
        
         <div className='Header'>
          <h1 className={'font-bold'}>{order.username}</h1>
          <p className={'font-light'}>{"#" + order.orderID}</p>
          <h2 onClick={onBgClick} className={'text-2xl pb-5'}>X</h2>
         </div>

         <div className='Main'>

         <div className='Main-Phone'>
         <p className='font-bold'>PHONE</p>
         <p>{order.phone}</p>
         </div>

         <div className='Main-Item'>
         <p className='font-bold'>ITEM</p>
         <p>{order.title}</p>
         </div>

         <div className='Main-Country'>
         <p className='font-bold'>COUNTRY</p>
         <p>{order.country}</p>
         </div>

         <div className='Main-City'>
         <p className='font-bold'>CITY</p>
         <p>{order.city}</p>
         </div>

         <div className='Main-AddressLine'>
         <p className='font-bold'>ADDRESS</p>
         <p>{order.addressLine}</p>
         </div>

         <div className='Main-Zipcode'>
         <p className='font-bold'>ZIPCODE</p>
         <p>{order.zipcode}</p>
         </div>
         
        </div >
   

        <div className='footer'>

          <div className="noClick"><button  onClick={()=>{}}>Booking</button></div>

          <div className={userQuota[order.username]<=0 ? "noClick":"Click"} >
          <button onClick={userQuota[order.username]<=0 ? ()=> {}:() => 
          {fetch(`${import.meta.env.VITE_API_URL}/${order.orderID}/Shipped`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ staffID, username })
          })}}>Shipped</button></div>

          <div className='Click'><button onClick={() => 
          {fetch(`${import.meta.env.VITE_API_URL}/${order.orderID}/Returned`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ staffID, username })
          })}}>Returned</button></div>

          <div className="Click"><button onClick={() => 
          {fetch(`${import.meta.env.VITE_API_URL}/${order.orderID}/Canceled`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ staffID, username })
          })}}>Canceled</button></div>
    
          </div>

       </div>

       </div>
      </div>
    </div>
  );
}

export default OrderDetail;