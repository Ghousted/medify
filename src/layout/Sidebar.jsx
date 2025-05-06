import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { doSignOut } from '../../firebase'; 

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'} transition-transform transform`}>
      <nav className="flex flex-col pt-10 gap-4">

        <Link 
          to="/home" 
          className="pl-12 py-4 hover:bg-linear-to-l from-[#f9cdc3] to-[#facefb] cursor-pointer transition-colors flex items-center">
            <i className="icon bi bi-house mr-2 text-base"></i> 
            <span className='text-sm'>Home</span>
        </Link>

        {/* Dosage Calculation Link */}
        <Link 
          to="/dosage-calculation" 
          className="pl-12 py-4 hover:bg-linear-to-l from-[#f9cdc3] to-[#facefb] cursor-pointer transition-colors flex items-center">
            <i className="icon bi bi-capsule mr-2 text-base"></i> 
            <span className='text-sm'>Dosage</span>
        </Link>

        {/* Health Assessment Checklist Link */}
        <Link 
          to="/health-checklist" 
          className="pl-12 py-4 hover:bg-linear-to-l from-[#f9cdc3] to-[#facefb] cursor-pointer transition-colors flex items-center">
            <i className="icon bi bi-check-circle mr-2 text-base"></i> 
            <span className='text-sm'>Assessment</span>
        </Link>

        <button
          onClick={handleLogout}
          className="pl-12 py-4 hover:bg-linear-to-l from-[#f9cdc3] to-[#facefb] cursor-pointer transition-colors flex items-center"
        >
          <i className="icon bi bi-box-arrow-right mr-2 text-base"></i> 
          <span className='text-sm'>Logout</span>
        </button>
        
      </nav>
    </div>
  );
};

export default Sidebar;
