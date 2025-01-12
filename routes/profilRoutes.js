const express = require('express');
const {updateProfile, getProfile} = require('../controllers/profilController');
const { authenticateToken } = require('../middlewares/authMiddleware');



const router = express.Router();

router.put('/profil',  updateProfile);
router.get('/profil',  getProfile);

module.exports = router;
