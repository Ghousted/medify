import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
        <h1 className="text-2xl font-bold text-gray-800">Medify</h1>
      <i className="menu-icon" onClick={toggleSidebar}><i className="bi bi-list"></i></i>
      <div className="logo">
     
      </div>
      <div className="search-container">
        {/* Search bar or other header content */}
        <input type="text" placeholder="Search..." 
            className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500'
        />
      </div>
    </div>
  );
};

export default Header;
