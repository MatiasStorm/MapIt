const { DataTypes, Model } = require("sequelize");

class TastingItem extends Model {
    static init(sequelize) {
        const structure = {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        };

        super.init(structure, { modelName: "TastingItem", sequelize });
    }
}

module.exports = TastingItem;
