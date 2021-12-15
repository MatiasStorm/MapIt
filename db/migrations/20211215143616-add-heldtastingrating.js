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
      await queryInterface.createTable("HeldTastingRatings", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
      })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.dropTable("HeldTastingRatings");
  }
};
