const express = require('express');
const { createConsultation, getConsultationById, updateConsultationStatus, getStatusById, getUserConsultationsPage ,  getUserConsultationsData, getConsultationsByUserId,getConsultationQueue, getQueueByUserId}  = require('../controllers/consultationController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/consultation', authenticateToken, createConsultation);
router.get('/consultations/:id', authenticateToken, getConsultationById);
router.put('/consultations/:id/status', authenticateToken, updateConsultationStatus);
router.get('/consultations/getStatusById/:userId', authenticateToken, getStatusById);
router.get('/consultations/getUserConsultationsPage', authenticateToken, getUserConsultationsPage);
router.get('/consultations/getUserConsultationsData', authenticateToken, getUserConsultationsData);
router.get('/consultations/userConsultation/:userId', authenticateToken, getConsultationsByUserId); // New route
router.get('/consultation-queue', getConsultationQueue); // Tambahkan ini
router.get('/consultation/queue/:userId', authenticateToken,getQueueByUserId)
module.exports = router;
