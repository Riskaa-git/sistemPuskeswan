const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Admin } = require('../models');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
const authenticateToken = (req, res, next) => {
  console.log('Auth header:', req.header('Authorization'));
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const isSuperAdmin = async (req, res, next) => {
  const admin = await Admin.findByPk(req.user.id);
  if (!admin || admin.role !== 'superadmin') {
    return res.status(403).json({ message: 'Access forbidden' });
  }
  next();
};

const isSuperAdminOrAdmin = async (req, res, next) => {
  const admin = await Admin.findByPk(req.user.id);
  if (!admin || (admin.role !== 'superadmin' && admin.role !== 'admin')) {
    return res.status(403).json({ message: 'Access forbidden' });
  }
  next();
};

module.exports = { authMiddleware, authenticateToken, isSuperAdmin, isSuperAdminOrAdmin };
