import React, { useState } from 'react';
import axios from 'axios';

const SignupModal = ({ onSubmit, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form className='login-modal' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <p className='important-message'>The signup feature is not currently in use</p>
      <input
        className="modal-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="modal-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <p>
        Already have an account?{' '}
        <span onClick={switchToLogin} className="modal-span">
          click here
        </span>{' '}
        to log in!
      </p>
      <button className="modal-button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignupModal;
