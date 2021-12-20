const { DataTypes, Model } = require("sequelize");

class TastingItem extends Model {
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
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tastingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
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

        super.init(structure, { modelName: "tastingItem", sequelize });
    }
}

module.exports = TastingItem;
