import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ setIsRegistered }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', formData);
      alert(response.data.message);
      setIsRegistered(true); // Set registered status to true
      navigate('/'); // Navigate back to home page after successful signup
    } catch (error) {
      alert('Signup failed: ' + error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '300px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Signup
      </button>
    </form>
  );
}

export default Signup;
