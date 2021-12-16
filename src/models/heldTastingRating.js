const { DataTypes, Model } = require("sequelize");

class HeldTastingRating extends Model {
    static init(sequelize) {
        const structure = {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            heldTastingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        };

        super.init(structure, { modelName: "heldTastingRating", sequelize });
    }
}

module.exports = HeldTastingRating;
