import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Delete Task
      </button>
    </div>
  );
}

export default DeleteTask;
