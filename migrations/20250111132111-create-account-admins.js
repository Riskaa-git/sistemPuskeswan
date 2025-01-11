const bcrypt = require('bcryptjs');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 // Meng-hash password dan menambahkan akun admin
 const hashedPassword = await bcrypt.hash('superadminpassword', 10); // Menggunakan password 'superadminpassword'

 await queryInterface.bulkInsert('Admins', [{
   email: 'superadmin@example.com',
   password: hashedPassword,
   role: 'superadmin',
   createdAt: new Date(),
   updatedAt: new Date(),
 }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
