import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'} transition-transform transform`}>
      <nav className="flex flex-col pt-10 gap-4">
        <Link to="/home" className="px-12 py-4 hover:bg-blue-600 cursor-pointer transition-colors flex items-center hover:text-white">
          <i className="icon bi bi-house mr-2 text-xl"></i> <span>Home</span>
        </Link>
        <Link to="/logout" className="px-12 py-4 hover:bg-blue-600 cursor-pointer transition-colors flex items-center hover:text-white">
          <i className="icon bi bi-box-arrow-right mr-2 text-xl"></i> <span>Logout</span>
        </Link>
        
      </nav>
    </div>
  );
};

export default Sidebar;