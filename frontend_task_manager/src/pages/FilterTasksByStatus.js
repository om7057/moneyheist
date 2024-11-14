import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FilterTasksByStatus() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('pending'); // Default status

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/status/${status}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks by status:', error);
      }
    };

    fetchTasks();
  }, [status]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Filter Tasks by Status</h2>
      <select
        onChange={(e) => setStatus(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default FilterTasksByStatus;
