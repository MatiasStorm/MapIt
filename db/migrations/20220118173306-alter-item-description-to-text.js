module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        const { DataTypes } = Sequelize;
        await queryInterface.changeColumn("tastingItems", "description", {
            type: DataTypes.TEXT,
            allowNull: true,
        });
        await queryInterface.changeColumn("heldTastingItems", "description", {
            type: DataTypes.TEXT,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        const { DataTypes } = Sequelize;
        await queryInterface.changeColumn("tastingItems", "description", {
            type: DataTypes.STRING(2000),
            allowNull: true,
        });

        await queryInterface.changeColumn("heldTastingItems", "description", {
            type: DataTypes.STRING(2000),
            allowNull: true,
        });
    },
};
