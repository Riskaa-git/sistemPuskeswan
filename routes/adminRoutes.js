const express = require('express');
const { handleConsultation, createAdmin, loginAdmin, getUsers, getConsultations, getApprovedOrRejectedConsultations, getConsultationsByUserId, getConsultationsBySearch, getConsultationDetails, deleteConsultation  } = require('../controllers/adminController');
const { authenticateToken, isSuperAdmin, isSuperAdminOrAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/handle-consultation', authenticateToken, isSuperAdminOrAdmin, handleConsultation);
router.post('/create-admin', authenticateToken, isSuperAdmin, createAdmin);
router.post('/loginAdmin', loginAdmin); // Route for admin login
router.get('/users', authenticateToken, isSuperAdmin, getUsers); // Route to get users list
router.get('/consultations', authenticateToken, isSuperAdminOrAdmin, getConsultations); // Route to get consultations list
router.get('/consultations/approved-rejected', authenticateToken, isSuperAdminOrAdmin, getApprovedOrRejectedConsultations);
router.get('/consultations/user/:userId', authenticateToken, isSuperAdminOrAdmin, getConsultationsByUserId); // New route
router.get('/consultations/search', authenticateToken, isSuperAdminOrAdmin, getConsultationsBySearch); // New route
router.get('/consultations/:consultationId',authenticateToken,isSuperAdminOrAdmin, getConsultationDetails);
router.delete('/consultations/:consultationId', authenticateToken,isSuperAdminOrAdmin ,deleteConsultation);
module.exports = router;
