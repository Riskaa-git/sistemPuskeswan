const { Consultation, User } = require('../models');
const { Op } = require('sequelize');


const getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['nama', 'NIK', 'alamat', 'kelurahan', 'kecamatan', 'nomorWA'],
      },
    });

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json({ consultation });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consultation details', error });
  }
};
const createConsultation = async (req, res) => {
  const { namaHewan, umurHewan, jenisKelamin, jenisHewan, keluhan } = req.body;
  const userId = req.user.id;

  // Check if there are any pending consultations
  const pendingConsultations = await Consultation.findOne({
    where: {
      status: 'pending'
    }
  });

  let queueNumber = 1;
  if (pendingConsultations) {
    // If there are pending consultations, get the last queue number
    const lastConsultation = await Consultation.findOne({
      order: [['queueNumber', 'DESC']]
    });
    if (lastConsultation) {
      queueNumber = lastConsultation.queueNumber + 1;
    }
  }

  const consultation = await Consultation.create({
    namaHewan, umurHewan, jenisKelamin, jenisHewan, keluhan, userId, queueNumber
  });

  res.json({ message: 'Consultation registered successfully', consultation });
};


const getConsultationQueue = async (req, res) => {
  try {
    const queue = await Consultation.findAll({
      where: {
        status: 'pending', // Misalnya hanya antrian yang statusnya pending
      },
      order: [['queueNumber', 'ASC']],
    });

    res.json({ queue });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consultation queue', error });
  }
};


const updateConsultationStatus = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    consultation.status = req.body.status;
    await consultation.save();

    res.json({ message: 'Consultation status updated successfully', consultation });
  } catch (error) {
    res.status(500).json({ message: 'Error updating consultation status', error });
  }
};




const getUserConsultationsPage = (req, res) => {
  res.render('user-consultations');
};

const getUserConsultationsData = async (req, res) => {
  try {
    const userId = req.user.id;
    const consultations = await Consultation.findAll({
      where: {
        userId: userId,
        status: {
          [Op.in]: ['approved', 'rejected']
        }
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(consultations);
  } catch (error) {
    console.error('Error in getUserConsultationsData:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data konsultasi' });
  }
};


const getConsultationsByUserId = async (req, res) => {
  const userId = req.user.id; // Mengambil ID dari token yang sudah diverifikasi
  try {
    console.log('Fetching consultations for user ID:', userId);
    const consultations = await Consultation.findAll({
      where: {
         userId: userId,
         status: {
          [Op.in]: ['pending']
        }
        }

    });
    console.log('Consultations found:', consultations.length);
    res.json({ consultations });
  } catch (error) {
    console.error('Error fetching consultations by user ID:', error);
    res.status(500).json({ message: 'Error fetching consultations by user ID' });
  }
};



const getStatusById = async (req, res) => {
  const userId = req.user.id; // Mengambil ID dari token yang sudah diverifikasi
  try {
    console.log('Fetching consultations for user ID:', userId);
    const consultations = await Consultation.findAll({
      where: {
         userId: userId,
         status: {
          [Op.in]:  ['approved', 'rejected']
        }
        }

    });
    console.log('Consultations found:', consultations.length);
    res.json({ consultations });
  } catch (error) {
    console.error('Error fetching consultations by user ID:', error);
    res.status(500).json({ message: 'Error fetching consultations by user ID' });
  }
};

const getQueueByUserId = async (req, res) => {
  const userId = req.user.id; // Mengambil ID dari token yang sudah diverifikasi
  try {
    console.log('Fetching consultations for user ID:', userId);
    const consultations = await Consultation.findAll({
      where: {
        userId: userId,
        status: {
          [Op.in]: ['pending']
        }
      },
      attributes: ['namaHewan', 'queueNumber'], // Hanya ambil nama hewan dan nomor antrian
      order: [['queueNumber', 'ASC']]
    });
    console.log('Consultations found:', consultations.length);
    res.json({ consultations });
  } catch (error) {
    console.error('Error fetching consultations by user ID:', error);
    res.status(500).json({ message: 'Error fetching consultations by user ID' });
  }
};


module.exports = {
   createConsultation, getConsultationById, updateConsultationStatus , getStatusById, getUserConsultationsPage, getUserConsultationsData, getConsultationsByUserId,   getConsultationQueue, getQueueByUserId// Tambahkan ini
  };
