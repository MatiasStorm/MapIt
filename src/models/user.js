const { DataTypes, Model } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        const structure = {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
        };

        super.init(structure, { modelName: "user", sequelize });
    }

    static associate(models) {
        User.hasMany(models.Tasting);
        User.hasMany(models.TastingItem);
        User.hasMany(models.Rating);

        User.hasMany(models.HeldTasting);
        User.hasMany(models.HeldTastingItem);
        User.hasMany(models.HeldTastingRating);
    }
}

module.exports = User;
