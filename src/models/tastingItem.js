const { DataTypes, Model } = require("sequelize");

class TastingItem extends Model {
    static init(sequelize) {
        const structure = {
            name: {
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

        super.init(structure, { modelName: "tasting_item", sequelize });
    }
}

module.exports = TastingItem;
