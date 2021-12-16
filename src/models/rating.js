const { DataTypes, Model } = require("sequelize");

class Rating extends Model {
    static init(sequelize) {
        const structure = {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tastingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        };

        super.init(structure, { modelName: "rating", sequelize });
    }
}

module.exports = Rating;
