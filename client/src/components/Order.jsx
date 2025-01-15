import { useState, useEffect, React } from 'react'
import './Order.css';
import OrderDetail from './OrderDetail';


function Order() {

    const [searchText, setSearchText] = useState('');
    const [searchSelected, setSearchSelected] = useState('Order ID');
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchStatus, setSearchStatus] = useState('');
    let userQuota = {};

    function onOrderOpenClick(order) {
        setSelectedOrder(order);
      }
    
      function onOrderCloseClick() {
        setSelectedOrder(null);
      }
  
     useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/orders`)
            .then(response => response.json())
            .then(usersData => {
                setOrders(usersData);
            })
            .catch(error => console.error('Error:', error));
    });

    orders && orders.forEach(quota => {
        userQuota[quota.username] = quota.quota;
    });

    orders && orders.forEach(order => {
      if(order.order_Status == "Shipped"){
        userQuota[order.username] -= 1;
      }});

    const filterOrder =  orders.filter((order, index) => {
    
        return (searchSelected === "Order ID") ? order.orderID.toString().includes(searchText) : 
        order.username.includes(searchText) ;
    })

    const filterOrder2 =  filterOrder.filter((order, index) => {
        return order.order_Status.includes(searchStatus);
    })

    let showOrderDetail = null;
    if (!!selectedOrder) {
      showOrderDetail = <OrderDetail order={selectedOrder} onBgClick={onOrderCloseClick} userQuota={userQuota} />;
    }

  return (
    <div className="h-screen flex-1 p-7">

    <h1 className="text-3xl font-semibold order-title ">Order</h1>

      <div className='select'>

    <select className='select1' onChange={(event) => {
      setSearchSelected(event.target.value)
      setSearchText('')}}>
    <option  value="Order ID" selected >Order ID</option>
    <option  value="Username" >Username</option>
    </select>

    <input  placeholder='Search' type='text' className='App-input' 
    value={searchText} onChange={(event => {setSearchText(event.target.value)})}></input>

    <img className='App-img' src='./src/assets/search.png' ></img>

    <select  className='select3' onChange={(event) => {setSearchStatus(event.target.value)}}>
    <option value="" selected>All</option>
    <option value="Booking">Booking</option>
    <option value="Shipped">Shipped</option>
    <option value="Returned">Returned</option>
    <option value="Canceled">Canceled</option>
    </select>
     </div>

    <table >
      <tr>
    <th>USER</th>
    <th>LOCATION</th>  
    <th>ORDER#</th>
    <th>STATUS</th>
      </tr>

  {filterOrder2.map((order,index) => (
    
    <tr key={index} onClick={() => onOrderOpenClick(order)}>
    <td>{order.username}</td>
    <td>{order.city + ", " + order.country}</td>
    <td>{order.orderID}</td>
    <td><p className={'color-'+order.order_Status}>{order.order_Status}</p></td>
    </tr>))}
  
  </table>

    {showOrderDetail}
    
    </div>
  
  );
}

export default Order;
