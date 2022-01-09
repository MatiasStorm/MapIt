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
            average: {
                type: DataTypes.VIRTUAL,
                get() {
                    if (this.playerRatings?.length === 0){
                        return null;
                    }
                    const sum = this.playerRatings.reduce(
                        ( total, p) => total + p.value, 
                        0
                    );
                    return (sum / this.playerRatings.length).toFixed(2);
                }
            }
        };

        super.init(structure, { modelName: "heldTastingRating", sequelize });
    }

    static associate(models){
        HeldTastingRating.hasMany(models.PlayerRating);
    }
}

module.exports = HeldTastingRating;
