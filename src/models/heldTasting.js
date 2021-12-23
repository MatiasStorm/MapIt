const { DataTypes, Model } = require("sequelize");

class HeldTasting extends Model {
    static init(sequelize) {
        const structure = {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1,
            },
            pin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            currentItemPosition: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            imagePath: {
                type: DataTypes.STRING,
                allowNull: true,
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

        super.init(structure, { modelName: "heldTasting", sequelize });
    }

    static associate(models) {
        HeldTasting.hasMany(models.HeldTastingItem);
        HeldTasting.hasMany(models.HeldTastingRating);
        HeldTasting.hasMany(models.Player);
    }
}

module.exports = HeldTasting;
