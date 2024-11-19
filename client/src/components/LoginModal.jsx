import React, { useState } from 'react';

const LoginModal = ({ onSubmit, switchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form className='login-modal' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className='important-message'>The login feature is currently only for Admin use</p>
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
        Don't have an account?{' '}
        <span onClick={switchToSignup} className="modal-span">
          Sign up here
        </span>
      </p>
      <button className="modal-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginModal;

