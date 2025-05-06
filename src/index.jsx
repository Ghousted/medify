import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSendEmailVerification,
  doPasswordReset,
  addUserToFirestore
} from '../firebase';
import { useNavigate } from 'react-router-dom';
import Modal from './utils/modalLogin'; // Import the Modal component
import Loading from './Loading'; // Import the Loading component

const Index = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openModal = (title, message) => {
    setModalMessage({ title, message });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      openModal("Error", "Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await addUserToFirestore(user.uid, firstName, lastName, email);
      await doSendEmailVerification();
      openModal("Email Sent", "Verification email sent. Please verify your email before signing in.");
      setIsSignUp(false);
    } catch (error) {
      openModal("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      if (userCredential.user.emailVerified) {
        navigate('/home'); // Navigate to Home.jsx inside pages folder
      } else {
        openModal("Verification Required", "Please verify your email before signing in.");
      }
    } catch (error) {
      openModal("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    try {
      await doPasswordReset(email);
      openModal("Password Reset", "Password reset email sent.");
    } catch (error) {
      openModal("Error", error.message);
    }
  };

  if (loading) {
    return <Loading />; // Use the Loading component
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full md:w-[900px] h-auto md:h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className={`flex flex-col justify-center items-center p-8 w-full md:w-1/2 ${isSignUp ? 'bg-gradient-to-r from-[#161647] to-[#3535AD] text-white' : 'bg-white text-gray-800'}`}>
          {isSignUp ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-6 text-center">
                Enter your personal details and start your journey with us.
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-purple-600 transition duration-300"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Sign In</h2>
              <p className="mb-6 text-center">or use your account.</p>
              <form onSubmit={handleSignIn} className="w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <div className="relative mb-4">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <i
                    className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'} text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <span
                    className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                    onClick={() => openModal("Forgot Password", "")}
                  >
                    Forgot Password?
                  </span>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-300"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className={`flex flex-col justify-center items-center p-8 w-full md:w-1/2 ${isSignUp ? 'bg-white text-gray-800' : 'bg-gradient-to-r from-[#161647] to-[#3535AD] text-white'}`}>
          {isSignUp ? (
            <>
              <h2 className="text-2xl text-l mb-2">Sign Up</h2>
              <p className="mb-4 text-center">or create your account.</p>
              <form onSubmit={handleSignUp} className="w-full">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-2 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-2 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <div className="relative mb-4">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <i
                    className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'} text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2  bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <i
                    className={`bi ${showConfirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'} text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                    onClick={toggleConfirmPasswordVisibility}
                  ></i>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-300"
                >
                  Sign Up
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-6 text-center">
                Enter your personal details and start your journey with us.
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-purple-600 transition duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={modalMessage.title}
          message={modalMessage.message}
        />
      )}
    </div>
  );
};

export default Index;
