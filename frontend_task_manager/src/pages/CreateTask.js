import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '300px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', height: '80px' }}
      ></textarea>
      <input
        type="date"
        name="dueDate"
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        name="priority"
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="high">High</option>
        <option value="medium" selected>Medium</option>
        <option value="low">Low</option>
      </select>
      <button
        type="submit"
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Create Task
      </button>
    </form>
  );
}

export default CreateTask;
