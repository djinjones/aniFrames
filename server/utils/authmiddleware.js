const jwt = require('jsonwebtoken');

// Middleware to verify token and user role
const authorizeAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the header

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request

    if (decoded.adminType === 'admin' || decoded.adminType === 'owner') {
      next(); // User is authorized, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access denied: Admins or owners only' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authorizeAdmin;
