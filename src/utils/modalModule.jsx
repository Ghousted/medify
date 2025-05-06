import React from 'react';

export const EditModuleModal = ({
  onClose,
  moduleName,
  moduleDescription,
  setModuleName,
  setModuleDescription,
  onUpdate,
}) => {
  return (
    <div className="modal-overlay">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Module</h2>
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          value={moduleDescription}
          onChange={(e) => setModuleDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeleteModuleModal = ({ onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Module</h2>
        <p className="mb-6">Are you sure you want to delete this module? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
