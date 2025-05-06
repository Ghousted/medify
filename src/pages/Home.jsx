import React, { useEffect, useState } from 'react';
import { auth, getUserNameFromFirestore } from '../../firebase'; // Adjust the import according to your project structure
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const name = await getUserNameFromFirestore(user.uid);
          setUserName(name);
        } else {
          navigate('/'); // Redirect to login if no user is signed in
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, [navigate]);

  const handleAddTask = () => {
    if (taskTitle) {
      setTasks([...tasks, { title: taskTitle, isCompleted: false }]);
      setTaskTitle('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <section className='w-full p-7 flex flex-col lg:flex-row gap-5'>
      {/* Left Section: Welcome Message */}
      <div className='flex-1 gap-5'>
        <div className='flex flex-col gap-5'>
          <div className='bg-white p-6 border border-gray-300 shadow-lg rounded-lg'>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, {userName}!</h1>
            <p className="text-gray-600">You are now signed in.</p>
          </div>

          {/* Material Title Input */}
          <div className='bg-white p-6 border border-gray-300 shadow-lg rounded-lg'>
            <h2 className='text-2xl mb-4 text-gray-800'>Create Material</h2>
            <div className='flex flex-row gap-4'>
              <input
                type='text'
                placeholder='Material Name...'
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <button
                onClick={handleAddTask}
                className='w-1/5 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300'
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Material List: Displaying all tasks below the form */}
          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-800'>Your Materials</h3>
          
          </div>
        </div>
      </div>

      {/* Right Section: Task List (Empty for now) */}
      <div className='w-full lg:w-1/3'>
        <div className='bg-white p-6 border border-gray-300 shadow-lg rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-800'>Task List</h2>
          <ul className='space-y-4'>
            {/* Tasks are listed above under the "Your Materials" section */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
