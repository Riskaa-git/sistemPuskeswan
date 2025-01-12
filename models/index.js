const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

// Membuat instance Sequelize dengan pengaturan yang benar
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: config.dialectOptions, // Menggunakan pengaturan dialectOptions dari config
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
