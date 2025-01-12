const express = require('express');
const {updateProfile, getProfile} = require('../controllers/profilController');
const { authenticateToken } = require('../middlewares/authMiddleware');



const router = express.Router();

router.put('/profil', authenticateToken, updateProfile);
router.get('/profil', authenticateToken, getProfile);

module.exports = router;
