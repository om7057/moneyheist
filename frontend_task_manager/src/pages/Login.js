import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true); // Set logged-in status to true
      navigate('/tasks');
    } catch (error) {
      alert('Login failed: ' + error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '300px', margin: '50px auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Login
      </button>
    </form>
  );
}

export default Login;
