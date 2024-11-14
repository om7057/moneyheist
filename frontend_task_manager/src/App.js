import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import DeleteTask from './pages/DeleteTask';
import FilterTasksByStatus from './pages/FilterTasksByStatus';
import { useState } from 'react';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isRegistered={isRegistered} isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsRegistered={setIsRegistered} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/tasks/update/:id" element={<UpdateTask />} />
        <Route path="/tasks/delete/:id" element={<DeleteTask />} />
        <Route path="/tasks/filter" element={<FilterTasksByStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
