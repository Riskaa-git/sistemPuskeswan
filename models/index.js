const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Consultation = require('./consultation')(sequelize, Sequelize);
db.Admin = require('./admin')(sequelize, Sequelize);

// Define relationships if any
db.User.hasMany(db.Consultation, { foreignKey: 'userId' });
db.Consultation.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
