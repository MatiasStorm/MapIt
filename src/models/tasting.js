const { DataTypes, Model } = require("sequelize");

class Tasting extends Model {
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
        };

        super.init(structure, { modelName: "Tasting", sequelize });
    }

    static associate(models) {
        Tasting.hasMany(models.TastingItem);
        Tasting.hasMany(models.Rating);
    }
}

module.exports = Tasting;
