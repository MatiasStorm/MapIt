const { DataTypes, Model } = require("sequelize");

class HeldTastingItem extends Model {
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

        super.init(structure, { modelName: "heldTastingItem", sequelize });
    }

    static associate(models){
        HeldTastingItem.hasMany(models.PlayerRating);
    }
}

module.exports = HeldTastingItem;
