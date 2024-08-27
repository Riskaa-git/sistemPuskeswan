const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


const updateProfile = async (req, res) => {
    try {
      const { nama, alamat, kelurahan, kecamatan, nomorWA } = req.body;
      const userId = req.user.id; // Asumsi ID pengguna yang terotentikasi disimpan di req.user.id
  
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      user.nama = nama || user.nama;
      user.alamat = alamat || user.alamat;
      user.kelurahan = kelurahan || user.kelurahan;
      user.kecamatan = kecamatan || user.kecamatan;
      user.nomorWA = nomorWA || user.nomorWA;
  
      await user.save();
  
      res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
  };

  const getProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch profile' });
    }
  };


  module.exports = {updateProfile, getProfile }