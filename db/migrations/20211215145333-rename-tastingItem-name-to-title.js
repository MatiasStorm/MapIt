module.exports = {
    up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        queryInterface.renameColumn("tastingItems", "name", "title");
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        queryInterface.renameColumn("tastingItems", "title", "name");
    },
};
