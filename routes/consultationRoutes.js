const express = require('express');
const { createConsultation, getConsultationById, updateConsultationStatus, getStatusById, getUserConsultationsPage ,  getUserConsultationsData, getConsultationsByUserId,getConsultationQueue, getQueueByUserId}  = require('../controllers/consultationController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/consultation',  createConsultation);
router.get('/consultations/:id',  getConsultationById);
router.put('/consultations/:id/status',  updateConsultationStatus);
router.get('/consultations/getStatusById/:userId',  getStatusById);
router.get('/consultations/getUserConsultationsPage',  getUserConsultationsPage);
router.get('/consultations/getUserConsultationsData',  getUserConsultationsData);
router.get('/consultations/userConsultation/:userId',  getConsultationsByUserId); // New route
router.get('/consultation-queue', getConsultationQueue); // Tambahkan ini
router.get('/consultation/queue/:userId', getQueueByUserId)
module.exports = router;
