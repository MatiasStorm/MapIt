module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

        const { DataTypes } = Sequelize;
        await queryInterface.addColumn("heldTastingRatings", "heldTastingId", {
            type: DataTypes.INTEGER,
            references: {
                model: "heldTastings",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
        await queryInterface.addColumn("heldTastingItems", "heldTastingId", {
            type: DataTypes.INTEGER,
            references: {
                model: "heldTastings",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
        await queryInterface.addColumn("heldTastings", "userId", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        await queryInterface.removeColumn("heldTastingRatings", "heldTastingId");
        await queryInterface.removeColumn("heldTastingItems", "heldTastingId");
        await queryInterface.removeColumn("heldTastings", "userId");
    },
};
