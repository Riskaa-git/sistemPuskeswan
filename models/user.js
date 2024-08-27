module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NIK: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kecamatan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nomorWA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return User;
  };
  