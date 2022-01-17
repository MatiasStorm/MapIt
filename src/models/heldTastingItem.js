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
            averages: {
                type: DataTypes.VIRTUAL,
                get() {
                    if (!this.playerRatings || this.playerRatings?.length === 0) {
                        return null;
                    }
                    const averages = {};
                    const ratingIds = this.playerRatings.map((p) => p.heldTastingRatingId);
                    for (const ratingId of ratingIds) {
                        const filteredRatings = this.playerRatings.filter((p) => p.heldTastingRatingId === ratingId);
                        const sum = filteredRatings.reduce((total, p) => total + p.value, 0);
                        averages[ratingId] = (sum / filteredRatings.length).toFixed(2);
                    }
                    return averages;
                },
            },
        };

        super.init(structure, { modelName: "heldTastingItem", sequelize });
    }

    static associate(models) {
        HeldTastingItem.hasMany(models.PlayerRating);
    }
}

module.exports = HeldTastingItem;
