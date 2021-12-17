'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      const { DataTypes } = Sequelize;
      await queryInterface.changeColumn("heldTastings", "isActive", {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      } )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      const { DataTypes } = Sequelize;
      await queryInterface.changeColumn("heldTastings", "isActive", {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      } )
  }
};
