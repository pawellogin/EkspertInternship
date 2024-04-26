import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService';
import '../styles/LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      navigate('/profile');
      window.location.reload();
    } catch (error) {
      if(!error?.response) {
        setError('No Server Response');
      } else if(error.response?.status === 400) {
        setError('Missing Username or Password');
      } else if(error.response?.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login Failed');
      }
    }
  };

  return (

    <section className='login-form'>
      <h1 className='login-form-title'> Login</h1>
      {error && <div className='alert alert-danger' role='alert' >{error}</div>}
      <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            className='form-control'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            className='form-control'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button className='btn btn-secondary' type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
