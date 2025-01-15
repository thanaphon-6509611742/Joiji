import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // เพิ่ม import โลโก้

const EditAddressForm = () => {
  const initialFormData = {
    username: sessionStorage.getItem('user'),
    addressLine: "",
    city: "",
    zipcode: "",
    country: "",
    phone: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  
  const updateAddress = () => {
    Axios.put('http://localhost:3000/update', formData)
      .then(response => {
        console.log("Address updated successfully");
        // สามารถเพิ่มการดำเนินการหลังจากอัปเดตข้อมูลในฐานข้อมูลได้ที่นี่
      })
      .catch(error => {
        console.error('Error updating address:', error);
      });
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAddress(); // ส่งข้อมูลเมื่อกด submit
    setFormData(initialFormData);
  };

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <Link to='/Menu'>
        <img src={logo} alt='logo' className='absolute left-8 top-8 w-32 md:w-36 lg:w-40 h-auto' />
      </Link>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form id="editAddressForm" onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '550px', display: 'grid', gridGap: '10px', gridTemplateRows: 'repeat(4, auto)', gridTemplateColumns: '1fr 1fr', gridRowGap: '25px' }}>
          <div className="input-group" style={{ gridColumn: 'span 2' }}>
            <h2 className='text-neutral-600 font-bold text-4xl'>Edit Address Information </h2>
          </div>
          
          <div className="input-group">
            <input type="text" placeholder='Address' id="addressLine" name="addressLine" value={formData.addressLine} onChange={handleInputChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
          </div>
          <div className="input-group">
            <input type="text" placeholder='City' id="city" name="city" value={formData.city} onChange={handleInputChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
          </div>
          <div className="input-group">
            <input type="text" placeholder='Zip code' id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleInputChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
          </div>
          <div className="input-group">
            <select id="country" name="country" value={formData.country} onChange={handleInputChange} required style={{ width: '80%', height: 50, padding: '10px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '230px', color: '#999', fontSize: '16px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23999" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16"><path d="M1.414 9.414l14 14a1.998 1.998 0 0 0 2.828 0l14-14a2 2 0 0 0-2.828-2.828L16 20.172 4.242 7.414a2 2 0 0 0-2.828 2.828z"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px top 50%', backgroundSize: '16px auto' }}>
              <option value="" disabled selected hidden>Country</option>
              <option value="thailand">Thailand</option>
              <option value="usa">USA</option>
              <option value="uk">England</option>
            </select>
          </div>
          <div className="input-group">
            <input type="tel" placeholder='Phone number' id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
          </div>
          <button className="btn btn-success" type="submit" style={{ width: '50%', height: 60, padding: '10px', backgroundColor: '#EF0000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', justifySelf: 'center', fontSize: '18px', gridColumn: 'span 2' }}> UPDATE </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddressForm;
