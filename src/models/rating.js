const { DataTypes, Model } = require("sequelize");

class Rating extends Model {
    static init(sequelize) {
        const structure = {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        };

        super.init(structure, { modelName: "Rating", sequelize });
    }
}

module.exports = Rating;
