const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Consultation, Admin } = require('../models');
const { Op } = require('sequelize'); 


// menghandle consultation akan di approve atau di rejected
const handleConsultation = async (req, res) => {
  const { consultationId, action } = req.body;
  const consultation = await Consultation.findByPk(consultationId);

  if (!consultation) return res.status(404).json({ message: 'Consultation not found' });
  consultation.status = action === 'accept' ? 'accepted' : 'rejected';
  await consultation.save();

  res.json({ message: `Consultation ${action}ed successfully`, consultation });
};


// membuat admin
const createAdmin = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ email, password: hashedPassword, role });

  res.json({ message: 'Admin created successfully', admin });
};


// melihat seluruh daftar admin yang ada
const getUsers = async (req, res) => {
  try {
    const users = await Admin.findAll();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};


// mendapatkan consultation yang masih pending
const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.findAll({
      where: {
        status: 'pending' 
      }
    });
    res.json({ consultations });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ message: 'Error fetching consultations' });
  }
};


// login untuk admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
};


// membuat super admin
const createSuperAdmin = async () => {
  const email = 'superadmin@example.com';
  const password = 'superadminpassword';
  const role = 'superadmin';

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashedPassword, role });
  console.log('Superadmin created successfully');
};

// melihat semua consultation yang sudah dii approve atau reject
const getApprovedOrRejectedConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.findAll({
      where: {
        status: { [Op.or]: ['approved', 'rejected'] }
      }
    });
    res.json({ consultations });
  } catch (error) {
    console.error('Error fetching approved/rejected consultations:', error);
    res.status(500).json({ message: 'Error fetching approved/rejected consultations' });
  }
};

// mendapatkan consultation menggunakan id
const getConsultationsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const consultations = await Consultation.findAll({
      where: { userId }
    });
    res.json({ consultations });
  } catch (error) {
    console.error('Error fetching consultations by user ID:', error);
    res.status(500).json({ message: 'Error fetching consultations by user ID' });
  }
};

// untuk mencari consultation
const getConsultationsBySearch = async (req, res) => {
  const { query } = req.query;
  try {
    const consultations = await Consultation.findAll({
      where: {
        [Op.or]: [
          { userId: query },
          { namaHewan: { [Op.iLike]: `%${query}%` } } 
        ]
      }
    });
    res.json({ consultations });
  } catch (error) {
    console.error('Error searching consultations:', error);
    res.status(500).json({ message: 'Error searching consultations' });
  }
};

// Mendapatkan detail konsultasi berdasarkan ID
const getConsultationDetails = async (req, res) => {
  const { consultationId } = req.params;
  
  if (!consultationId || consultationId === 'undefined') {
    return res.status(400).json({ message: 'Invalid consultation ID' });
  }

  try {
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json({ consultation });
  } catch (error) {
    console.error('Error fetching consultation details:', error);
    res.status(500).json({ message: 'Error fetching consultation details' });
  }
};

// Menghapus konsultasi berdasarkan ID
const deleteConsultation = async (req, res) => {
  const { consultationId } = req.params;

  if (!consultationId || consultationId === 'undefined') {
    return res.status(400).json({ message: 'Invalid consultation ID' });
  }

  try {
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    await consultation.destroy();
    res.json({ message: 'Consultation deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ message: 'Error deleting consultation' });
  }
};

module.exports = { 
  handleConsultation, 
  createAdmin, 
  loginAdmin, 
  createSuperAdmin, 
  getUsers, 
  getConsultations, 
  getApprovedOrRejectedConsultations, 
  getConsultationsByUserId, 
  getConsultationsBySearch,
  getConsultationDetails,  
  deleteConsultation       
};
