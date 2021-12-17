'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.renameColumn("tastingItems", "imageUrl", "imagePath");
      await queryInterface.renameColumn("heldTastingItems", "imageUrl", "imagePath");
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.renameColumn("tastingItems", "imagePath", "imageUrl");
      await queryInterface.renameColumn("heldTastingItems", "imagePath", "imageUrl");
  }
};
