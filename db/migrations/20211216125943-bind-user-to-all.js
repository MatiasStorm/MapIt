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
      await queryInterface.addColumn("tastingItems", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
      });
      await queryInterface.addColumn("ratings", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
      });
      await queryInterface.addColumn("heldTastingItems", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
      });
      await queryInterface.addColumn("heldTastingRatings", "userId", {
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
      await queryInterface.removeColumn("tastingItems", "userId");
      await queryInterface.removeColumn("ratings", "userId");
      await queryInterface.removeColumn("heldTastingItems", "userId");
      await queryInterface.removeColumn("heldTastingRatings", "userId");
  }
};
