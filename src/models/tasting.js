const { DataTypes, Model } = require("sequelize");

class Tasting extends Model {
    static init(sequelize) {
        const structure = {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imagePath: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.VIRTUAL,
                get() {
                    const imageUrl = this.getDataValue("imagePath")
                        ? `${process.env.AWS_BUCKET_ENDPOINT}/${process.env.AWS_BUCKET_NAME}/${this.getDataValue("imagePath")}`
                        : "/assets/default_tasting.jpeg";
                    return imageUrl;
                },
            },
        };

        super.init(structure, { modelName: "tasting", sequelize });
    }

    static associate(models) {
        Tasting.hasMany(models.TastingItem);
        Tasting.hasMany(models.Rating);
    }
}

module.exports = Tasting;
