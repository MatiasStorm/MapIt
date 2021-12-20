module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        const { DataTypes } = Sequelize;
        await queryInterface.addColumn("heldTastings", "currentItem", {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "SET NULL",
            onDelete: "SET NULL",
        });
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        await queryInterface.removeColumn("heldTastings", "currentItem");
    },
};
