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
      queryInterface.addColumn("tastingItems", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
      });
      queryInterface.addColumn("ratings", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
      });
      queryInterface.addColumn("heldTastingItems", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
      });
      queryInterface.addColumn("heldTastingRatings", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      queryInterface.removeColumn("tastingItems", "userId");
      queryInterface.removeColumn("ratings", "userId");
      queryInterface.removeColumn("heldTastingItems", "userId");
      queryInterface.removeColumn("heldTastingRatings", "userId");
  }
};
