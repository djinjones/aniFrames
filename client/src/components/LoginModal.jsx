import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../utils/authContext.jsx'

const LoginModal = ({ switchToSignup }) => {
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('The login feature is currently only for Admin use');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const { login } = useContext(AuthContext); // Use the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:5173/api/users/login', {
        userOrEmail,
        password,
      });

      const { token, authInfo } = response.data; // Extract token and user info
      login(token, authInfo); // Update global authentication state

      setError(false);
      setMessage('Login successful!');
      setUserOrEmail('');
      setPassword('');
    } catch (err) {
      setError(true);
      setMessage(
        err.response?.data?.message || 'An error occurred during Login'
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <form className="login-modal" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className={error ? 'error-message' : 'success-message'}>{message}</p>
      <div className="input-container">
        <input
          className="modal-input"
          type="text"
          placeholder="Username or email"
          value={userOrEmail}
          onChange={(e) => setUserOrEmail(e.target.value)}
          required
        />
      </div>
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
