module.exports = (sequelize, DataTypes) => {
    const Consultation = sequelize.define('Consultation', {
      namaHewan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      umurHewan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jenisKelamin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenisHewan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keluhan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      queueNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
      } ,

    });
  
    return Consultation;
  };
  