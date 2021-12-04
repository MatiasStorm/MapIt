const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tastr", "user", "password", {
    host: "tastrDB",
    dialect: "mysql",
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to database has been established");
    } catch (error) {
        console.error("Unable to connect to database:", error);
    }
})();

// Initialize models
const models = require("./models");

Object.values(models).forEach((model) => {
    model.init(sequelize);
});
Object.values(models).forEach((model) => {
    if ("associate" in model) {
        model.associate(models);
    }
});

module.exports = sequelize;
