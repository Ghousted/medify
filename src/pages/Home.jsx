import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useHandleModule } from '../hooks/useHandleModule';
import { EditModuleModal, DeleteModuleModal } from '../utils/modalModule';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const {
    moduleName,
    setModuleName,
    moduleDescription,
    setModuleDescription,
    onCreateModule,
    modules,
    deleteModule,
    updateModule,
  } = useHandleModule();

  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) navigate('/');
    else setUserName(user.displayName || 'User');
  }, [navigate]);

  const handleEditClick = (mod, event) => {
    event.stopPropagation();
    setSelectedModule(mod);
    setModuleName(mod.name);
    setModuleDescription(mod.description);
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (mod, event) => {
    event.stopPropagation();
    setSelectedModule(mod);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const handleModuleClick = (modId) => {
    navigate(`/module/${modId}`);
  };

  const toggleMenu = (id, event) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <section className="w-full p-5 flex flex-col lg:flex-row gap-5">
      <div className="flex-1 flex flex-col gap-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#f9cdc3] to-[#facefb] p-6 shadow-lg rounded-xl">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to Medify, {userName}!</h1>
          <p className="text-gray-700 italic mt-1">
            The hands you train today will one day hold someone’s hope.
          </p>
        </div>

        {/* Create Module Form */}
        <form onSubmit={onCreateModule} className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Material Name..."
            className="w-full sm:w-2/5 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Material Description..."
            className="w-full sm:w-3/5 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Create
          </button>
        </form>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-4 cursor-pointer relative transition hover:shadow-xl"
              onClick={() => handleModuleClick(mod.id)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{mod.name}</h3>
              <p className="text-gray-600 mt-2">{mod.description}</p>

              {/* Options Menu */}
              <div
                className="absolute bottom-2 right-2"
                onClick={(e) => toggleMenu(mod.id, e)}
              >
                <i className="bi bi-three-dots-vertical text-xl cursor-pointer px-2 py-1 rounded-full hover:bg-gray-200"></i>
                {openMenuId === mod.id && (
                  <div className="absolute bottom-10 right-0 w-28 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                    <button
                      onClick={(e) => handleEditClick(mod, e)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(mod, e)}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Task List Placeholder */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-6 border border-gray-300 shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Task List</h2>
          <p className="text-gray-500 italic">Coming soon...</p>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && selectedModule && (
        <EditModuleModal
          onClose={() => setShowEditModal(false)}
          moduleName={moduleName}
          moduleDescription={moduleDescription}
          setModuleName={setModuleName}
          setModuleDescription={setModuleDescription}
          onUpdate={() => {
            updateModule(selectedModule.id, moduleName, moduleDescription);
            setShowEditModal(false);
          }}
        />
      )}

      {showDeleteModal && selectedModule && (
        <DeleteModuleModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => {
            deleteModule(selectedModule.id);
            setShowDeleteModal(false);
          }}
        />
      )}
    </section>
  );
};

export default Home;
