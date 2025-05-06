import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from './index'; // Your sign-in/sign-up component
import Home from './pages/Home'; // The new dashboard component
import Module from './pages/Module'; // The module details page
import Layout from './layout/Layout'; // Layout component for consistent structure
import DosageCalculation from './pages/Dosage'; // Dosage calculation page
import HealthChecklist from './pages/Assessment'; // Health assessment checklist page
import { auth, getUserNameFromFirestore, setupAuthStateListener } from '../firebase'; // Firebase functions

const AppContent = () => {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor authentication state and handle user data
  useEffect(() => {
    const unsubscribe = setupAuthStateListener(async (user) => {
      if (user) {
        if (user.emailVerified) {
          const name = await getUserNameFromFirestore(user.uid);
          setUserName(name);
        } else {
          setUserName(null); // If email is not verified, do not proceed
        }
      } else {
        setUserName(null); // If no user is logged in, reset the state
      }
      setIsLoading(false); // Stop loading once auth state is checked
    });
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  if (isLoading) {
    return <Layout isLoading={isLoading} />; // Show loading screen if auth state is being checked
  }

  return (
    <Routes>
      {/* Route for the login/sign-up page */}
      <Route path="/" element={<Index />} />

      {/* Protected Route for the home page, requires user to be logged in */}
      <Route
        path="/home"
        element={
          userName ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/" /> // If user is not logged in or not verified, redirect to login
          )
        }
      />

      {/* Route for the module details page, module ID is dynamic */}
      <Route path="/module/:id" element={<Layout><Module /></Layout>} />

      {/* Route for Dosage Calculation */}
      <Route path="/dosage-calculation" element={
        userName ? (
          <Layout>
            <DosageCalculation />
          </Layout>
        ) : (
          <Navigate to="/" />
        )
      } />

      {/* Route for Health Assessment Checklist */}
      <Route path="/health-checklist" element={
        userName ? (
          <Layout>
            <HealthChecklist />
          </Layout>
        ) : (
          <Navigate to="/" />
        )
      } />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
