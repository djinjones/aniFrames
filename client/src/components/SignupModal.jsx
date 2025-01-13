import React, { useState } from 'react';
import axios from 'axios';

const SignupModal = ({ onSubmit, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('')
  const [message, setMessage] = useState('The signup feature is not currently in use');
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //change api endpoint to actual endpoint when publishing site

      if (!secret) {
        setSecret('0')
      }

      const response = await axios.post('http://localhost:5173/api/users/signup', {
        username,
        email,
        password,
        secret,
      });

      setError(false)

      setMessage(response.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      setSecret('');
    } catch (err) {
      setError(true)
      setMessage(
        err.response?.data?.message || 'An error occurred during signup'
      )
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <form className='login-modal' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {message && (<p className={error ? 'error-message' : 'success-message'}>{message}</p>)}
      <div className='input-container'><input
        className="modal-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /></div>
      <div className='input-container'><input
        className="modal-input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /></div>
      <div className="input-container">
        <input
          className="modal-input"
          type={showPassword ? 'text' : 'password'} // Change input type dynamically
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="toggle-password"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>
      <div className='input-container'><input
        className="modal-input"
        type="text"
        placeholder="secret (if you have one)"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        default="1"
      /></div>
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
