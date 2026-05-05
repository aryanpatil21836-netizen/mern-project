import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
  'https://mern-project-85uj.onrender.com/api/v1/user/login',
  {
    email,
    password,
  }
);
      // backend se jo data aaye usko save karo
      localStorage.setItem('userInfo', JSON.stringify(data));

      // admin hai to admin page
      if (data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Login failed'
      );
    }
  };

  return (
    <div style={container}>
      <form onSubmit={submitHandler} style={form}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
          required
        />

        <button type="submit" style={button}>
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          New user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

const container = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f4f4f4',
};

const form = {
  width: '350px',
  background: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
};

const input = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const button = {
  width: '100%',
  padding: '12px',
  background: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LoginPage;