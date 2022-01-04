const { DataTypes, Model } = require("sequelize");

class PlayerRating extends Model {
    static init(sequelize) {
        const structure = {
            playerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            heldTastingRatingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        };

        super.init(structure, { modelName: "playerRating", sequelize });
    }

    static associate(models){
        PlayerRating.belongsTo(models.Player);
        PlayerRating.belongsTo(models.HeldTastingRating);
    }
}

module.exports = PlayerRating;
