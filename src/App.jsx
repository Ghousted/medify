import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from './index'; // Your sign-in/sign-up component
import Home from './pages/Home'; // The new dashboard component
import Layout from './layout/Layout'; // Import the Layout component
import { auth, getUserNameFromFirestore, setupAuthStateListener } from '../firebase'; // Import Firebase functions

const AppContent = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const unsubscribe = setupAuthStateListener(async (user) => {
      if (user) {
        if (user.emailVerified) {
          const name = await getUserNameFromFirestore(user.uid);
          setUserName(name);
        } else {
          setUserName(null);
        }
      } else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/home"
        element={
          userName ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
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
