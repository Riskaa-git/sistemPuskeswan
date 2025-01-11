'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namaHewan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      umurHewan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jenisKelamin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenisHewan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keluhan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama tabel yang berelasi
          key: 'id', // Kolom yang menjadi foreign key
        },
        onDelete: 'CASCADE', // Menghapus consultation jika user dihapus
        onUpdate: 'CASCADE', // Mengupdate consultation jika user diupdate
      },
      queueNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Consultations');
  },
};
