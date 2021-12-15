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
                allowNull: false,
                default: true,
            },
            pin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imagePath: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            imageUrl: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${process.env.AWS_BUCKET_ENDPOINT}/${process.env.AWS_BUCKET_NAME}/${this.getDataValue("imagePath")}`;
                },
                set() {
                    throw new Error("Do no try to set the 'imageUrl', set the 'imagePath'");
                },
            },
        };

        super.init(structure, { modelName: "HeldTasting", sequelize });
    }
}

module.exports = HeldTasting;
