import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask() {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <input
        type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        placeholder="Title"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Description"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        name="priority"
        value={taskData.priority}
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select
        name="status"
        value={taskData.status}
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button 
        type="submit" 
        style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Update Task
      </button>
    </form>
  );
}

export default UpdateTask;
