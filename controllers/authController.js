// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const registerUser = async (req, res) => {
  try {
    const { email, password, nama, NIK, alamat, kelurahan, kecamatan, nomorWA } = req.body;
    
    // Log data yang diterima untuk debugging
    console.log('Received data:', req.body);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    
     // Simpan user ke database
    const user = await User.create({ email, password: hashedPassword, nama, NIK, alamat, kelurahan, kecamatan, nomorWA });
    
    // Kirim respon sukses
    res.json({ success: true, message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });

  
};

module.exports = { registerUser, loginUser };
