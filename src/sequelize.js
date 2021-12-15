const { Sequelize } = require("sequelize");
const models = require("./models");

module.exports = async () => {
    const sequelize = new Sequelize(
        process.env.MYSQL_DATABASE,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASSWORD,
        {
            host: "tastrDB",
            dialect: "mysql",
        },
    );

    try {
        await sequelize.authenticate();
        // Initialize models

        Object.values(models).forEach((model) => {
            model.init(sequelize);
        });
        // We do two loops, because all models has to be initialized before doing the associations
        Object.values(models).forEach((model) => {
            if ("associate" in model) {
                model.associate(models);
            }
        });
        console.log("Connection to database has been established");
    } catch (error) {
        console.error("Unable to connect to database:", error);
    }
};
