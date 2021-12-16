module.exports = {
    up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        queryInterface.renameColumn("tastings", "imageUrl", "imagePath");
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        queryInterface.renameColumn("tastings", "imagePath", "imageUrl");
    },
};
