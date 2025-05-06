// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
