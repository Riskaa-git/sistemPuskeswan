const express = require('express');
const {
     handleConsultation, 
     createAdmin, 
     loginAdmin, 
     getUsers, 
     getConsultations, 
     getApprovedOrRejectedConsultations, 
     getConsultationsByUserId, 
     getConsultationsBySearch, 
     getConsultationDetails,
      deleteConsultation ,

} = require('../controllers/adminController');
const { isSuperAdmin, isSuperAdminOrAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/handle-consultation', isSuperAdminOrAdmin, handleConsultation);
router.post('/create-admin', isSuperAdmin, createAdmin);
router.post('/loginAdmin', loginAdmin); // Route for admin login
router.get('/users', isSuperAdmin, getUsers); // Route to get users list
router.get('/consultations', isSuperAdminOrAdmin, getConsultations); // Route to get consultations list
router.get('/consultations/approved-rejected', isSuperAdminOrAdmin, getApprovedOrRejectedConsultations);
router.get('/consultations/user/:userId', isSuperAdminOrAdmin, getConsultationsByUserId); // New route
router.get('/consultations/search', isSuperAdminOrAdmin, getConsultationsBySearch); // New route
router.get('/consultations/:consultationId',authenticateToken,isSuperAdminOrAdmin, getConsultationDetails);
router.delete('/consultations/:consultationId', authenticateToken,isSuperAdminOrAdmin ,deleteConsultation);
module.exports = router;
