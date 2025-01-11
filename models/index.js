const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

// Membuat instance Sequelize dengan pengaturan yang benar
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  // Menambahkan pengaturan SSL jika diperlukan
  ssl: config.ssl || false, // Menggunakan SSL jika ada di konfigurasi
  dialectOptions: config.ssl ? { ssl: { rejectUnauthorized: false } } : {} // Menambahkan opsi SSL jika ada
});

const db = {};

// Menyimpan instance Sequelize dan koneksi
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Menyertakan model-model yang ada
db.User = require('./user')(sequelize, Sequelize);
db.Consultation = require('./consultation')(sequelize, Sequelize);
db.Admin = require('./admin')(sequelize, Sequelize);

// Mendefinisikan relasi antara model
db.User.hasMany(db.Consultation, { foreignKey: 'userId' });
db.Consultation.belongsTo(db.User, { foreignKey: 'userId' });

// Jika ada relasi lain, tambahkan di sini

module.exports = db;
