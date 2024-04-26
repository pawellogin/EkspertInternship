import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import '../styles/RegisterForm.css'

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
        setError('Passwords do not match');
        setIsRegistered(false); 
        return;
    }
    try {
      const response = await AuthService.register(username, password, firstName, lastName);
      setIsRegistered(true);
      setError('');
    } catch (error) {
      if(!error.response) {
        setError('No Server Response');
      } else if(error.response?.status == 409){
        setError('Username Taken');
      } else {
        setError(' Registration failed');
      }
      console.error('Registration failed :', error);
    }
  };

  return (
    <section className='register-form'>
      <h1> Register</h1>

      {error && !isRegistered && <div className='alert alert-danger'>{error}</div>}
      {isRegistered && <div className="alert alert-success">Registration Successful!</div>}

      <form onSubmit={handleRegister}>
          <label htmlFor="username">Username:</label>
          <input
            className='form-control'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className='form-control'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            className='form-control'
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />

          <label htmlFor="username">First Name:</label>
          <input
            className='form-control'
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="username">Last Name:</label>
          <input
            className='form-control'
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

        <button className='btn btn-secondary' type="submit">Register</button>
      </form>
    </section>
  );
};

export default RegisterForm;
