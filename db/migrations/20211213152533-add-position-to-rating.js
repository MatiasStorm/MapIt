module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        const { DataTypes } = Sequelize;
        await queryInterface.addColumn("Ratings", "position", {
            type: DataTypes.INTEGER,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        await queryInterface.removeColumn("Ratings", "position");
    },
};
