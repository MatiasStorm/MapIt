const { DataTypes, Model } = require("sequelize");

class Rating extends Model {
    static init(sequelize) {
        const structure = {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        };

        super.init(structure, { modelName: "rating", sequelize });
    }
}

module.exports = Rating;
