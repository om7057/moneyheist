import React, { useEffect, useState } from 'react'; 

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    id: null,
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (new Date(taskData.dueDate) < new Date()) {
      setError('Due date cannot be in the past.');
      return;
    }

    setError('');

    try {
      setLoading(true);
      const url = isEditing ? `http://localhost:3000/tasks/${taskData.id}` : 'http://localhost:3000/tasks';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit task');
      }

      setTaskData({
        id: null,
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
      });
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
      setError('Failed to submit task. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setTaskData(task);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Your Tasks</h2>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
        ></textarea>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
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
        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </form>

      {tasks.map((task) => (
        <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <button onClick={() => handleEdit(task)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Edit
          </button>
          <button onClick={() => handleDelete(task.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
