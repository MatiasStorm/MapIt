const { DataTypes, Model } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        const structure = {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        };

        super.init(structure, { modelName: "User", sequelize });
    }

    static associate(models) {
        User.hasMany(models.Tasting);
    }
}

module.exports = User;
