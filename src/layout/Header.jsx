import React from 'react';
import Logo from '../assets/react.svg';

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">

     
      <div className="logo flex items-center  gap-3">
        <img src={Logo} alt="Logo" />
        <p className="text-2xl font-bold">Medify</p>
      </div>
      <i className="menu-icon" onClick={toggleSidebar}><i className="bi bi-list"></i></i>

      
      <div className="search-container">
        <input type="text" placeholder="Search..." 
            className='w-full border border-gray-300 rounded-lg py-1 px-4 focus:outline-none focus:border-blue-500'
        />
      </div>
    </div>
  );
};

export default Header;
