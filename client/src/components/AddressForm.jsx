import React, { useState } from 'react';

function AddressForm({ setUserInfo, setStep }){

  const [country, setCountry] = useState('Thailand');

  const handleFirstNameChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, first_name: e.target.value }));
  }

  const handleLastNameChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, last_name: e.target.value }));
  }

  const handlePhoneChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, phone: e.target.value }));
  }

  const handleAddressChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, addressLine: e.target.value }));
  }

  const handleCityChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, city: e.target.value }));
  }

  const handleZipcodeChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, zipcode: e.target.value }));
  }

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setUserInfo(prevState => ({ ...prevState, country: e.target.value }));
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setStep(4);
  };

  return (
    <form id="addressForm" onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '550px', display: 'grid', gridGap: '10px', gridTemplateRows: 'repeat(4, auto)', gridTemplateColumns: '1fr 1fr', gridRowGap: '25px' }}>
      <div className="input-group" style={{ gridColumn: 'span 2' }}>
        <h2 className='text-neutral-600 font-bold text-4xl'>Address Information </h2>
      </div>
      <div className="input-group">
        <input type="text" placeholder='Firstname' id="firstname" name="first_name" onChange={handleFirstNameChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
      </div>
      <div className="input-group">
        <input type="text" placeholder='Lastname' id="lastname" name="last_name" onChange={handleLastNameChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
      </div>
      <div className="input-group">
        <input type="text" placeholder='Address' id="addressLine" name="addressLine" onChange={handleAddressChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
      </div>
      <div className="input-group">
        <input type="text" placeholder='City' id="city" name="city" onChange={handleCityChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
      </div>
      <div className="input-group">
        <input type="text" placeholder='Zip code' id="zipcode" name="zipcode" onChange={handleZipcodeChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
      </div>
      <div className="input-group">
        <select value={country} id="country" name="country" onChange={handleCountryChange} required style={{ width: '80%', height: 50, padding: '10px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '230px', color: '#999', fontSize: '16px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23999" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16"><path d="M1.414 9.414l14 14a1.998 1.998 0 0 0 2.828 0l14-14a2 2 0 0 0-2.828-2.828L16 20.172 4.242 7.414a2 2 0 0 0-2.828 2.828z"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px top 50%', backgroundSize: '16px auto' }}>
          <option value="" disabled selected hidden>Country</option>
          <option value="Thailand">Thailand</option>
          <option value="USA">USA</option>
          <option value="UK">England</option>
        </select>
      </div>
      <div className="input-group">
        <input type="tel" placeholder='Phone number' id="phone" name="phone" onChange={handlePhoneChange} required style={{ width: '80%', padding: '12px', border: '1px solid #000000', borderRadius: '5px', maxWidth: '200px' }} />
      </div>
      <button className="btn btn-success" type="submit" style={{ width: '50%', height: 60, padding: '10px', backgroundColor: '#EF0000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', justifySelf: 'center', fontSize: '18px', gridColumn: 'span 2' }}> NEXT </button>
    </form>
  )
}

export default AddressForm;