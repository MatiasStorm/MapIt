module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        const { DataTypes } = Sequelize;
        await queryInterface.changeColumn("users", "username", {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        });
        await queryInterface.changeColumn("users", "email", {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        await queryInterface.changeColumn("users", "username", {
            type: DataTypes.STRING,
            allowNull: false,
        });
        await queryInterface.changeColumn("users", "email", {
            type: DataTypes.STRING,
            allowNull: false,
        });
    },
};
