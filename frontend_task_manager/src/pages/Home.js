import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isRegistered, isLoggedIn }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Task Manager App</h1>
      {isRegistered ? (
        <>
          {isLoggedIn ? (
            <>
              <p>You are logged in! Start managing your tasks below:</p>
              <Link to="/tasks">
                <button style={{ padding: '10px 20px', fontSize: '16px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                  View Tasks
                </button>
              </Link>
              <Link to="/tasks/create">
                <button style={{ padding: '10px 20px', fontSize: '16px', margin: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}>
                  Create New Task
                </button>
              </Link>
              <Link to="/tasks/filter">
                <button style={{ padding: '10px 20px', fontSize: '16px', margin: '10px', backgroundColor: '#FFC107', color: 'white', border: 'none', borderRadius: '5px' }}>
                  Filter Tasks
                </button>
              </Link>
            </>
          ) : (
            <>
              <p>You have successfully registered! Please log in to continue.</p>
              <Link to="/login">
                <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px', backgroundColor: '#FF5722', color: 'white', border: 'none', borderRadius: '5px' }}>
                  Login
                </button>
              </Link>
            </>
          )}
        </>
      ) : (
        <>
          <p>Please register to start managing your tasks.</p>
          <Link to="/signup">
            <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px', backgroundColor: '#673AB7', color: 'white', border: 'none', borderRadius: '5px' }}>
              Register Now
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
