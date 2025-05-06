import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Ensure sidebar is open on larger screens
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
