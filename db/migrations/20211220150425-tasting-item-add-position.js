module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        const { DataTypes } = Sequelize;
        await queryInterface.addColumn("tastingItems", "position", {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        });
        await queryInterface.addColumn("heldTastingItems", "position", {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        });
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        await queryInterface.removeColumn("tastingItems", "position");
        await queryInterface.removeColumn("heldTastingItems", "position");
    },
};
